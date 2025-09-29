#!/usr/bin/env python3
"""
Conversation Memory System
Manages user conversation history and context for the campaign chatbot
"""

import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from collections import defaultdict

@dataclass
class ConversationTurn:
    """Single turn in conversation"""
    timestamp: str
    user_message: str
    bot_response: str
    source: str  # "rag", "candidate_knowledge", "programmed"
    session_id: str
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'ConversationTurn':
        return cls(**data)

@dataclass
class UserProfile:
    """User profile with interests and conversation history"""
    session_id: str
    first_seen: str
    last_active: str
    total_messages: int
    interests: List[str]  # Topics the user has asked about
    frequent_queries: List[str]  # Most common query types
    conversation_style: str  # "detailed", "brief", "conversational"
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'UserProfile':
        return cls(**data)

class ConversationMemory:
    """Manages conversation history and user profiles"""
    
    def __init__(self, memory_file: str = "conversation_memory.json", max_age_days: int = 30):
        self.memory_file = memory_file
        self.max_age_days = max_age_days
        self.conversations: Dict[str, List[ConversationTurn]] = defaultdict(list)
        self.user_profiles: Dict[str, UserProfile] = {}
        self.load_memory()
    
    def load_memory(self):
        """Load conversation history from file"""
        if os.path.exists(self.memory_file):
            try:
                with open(self.memory_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Load conversations
                for session_id, turns in data.get('conversations', {}).items():
                    self.conversations[session_id] = [
                        ConversationTurn.from_dict(turn) for turn in turns
                    ]
                
                # Load user profiles
                for session_id, profile_data in data.get('user_profiles', {}).items():
                    self.user_profiles[session_id] = UserProfile.from_dict(profile_data)
                
                # Clean old conversations
                self._clean_old_conversations()
                print(f"✅ Loaded conversation memory for {len(self.conversations)} sessions")
                
            except Exception as e:
                print(f"⚠️ Error loading conversation memory: {e}")
                self.conversations = defaultdict(list)
                self.user_profiles = {}
    
    def save_memory(self):
        """Save conversation history to file"""
        try:
            data = {
                'conversations': {
                    session_id: [turn.to_dict() for turn in turns]
                    for session_id, turns in self.conversations.items()
                },
                'user_profiles': {
                    session_id: profile.to_dict()
                    for session_id, profile in self.user_profiles.items()
                },
                'last_updated': datetime.now().isoformat()
            }
            
            with open(self.memory_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
        except Exception as e:
            print(f"⚠️ Error saving conversation memory: {e}")
    
    def add_conversation_turn(self, session_id: str, user_message: str, 
                            bot_response: str, source: str):
        """Add new conversation turn"""
        turn = ConversationTurn(
            timestamp=datetime.now().isoformat(),
            user_message=user_message,
            bot_response=bot_response,
            source=source,
            session_id=session_id
        )
        
        self.conversations[session_id].append(turn)
        self._update_user_profile(session_id, user_message, source)
        
        # Keep only last 20 turns per session to avoid memory bloat
        if len(self.conversations[session_id]) > 20:
            self.conversations[session_id] = self.conversations[session_id][-20:]
        
        # Save every 5 turns to persist data
        if len(self.conversations[session_id]) % 5 == 0:
            self.save_memory()
    
    def get_conversation_context(self, session_id: str, last_n_turns: int = 5) -> str:
        """Get recent conversation context for the user"""
        if session_id not in self.conversations:
            return "Primeira conversa com este utilizador."
        
        recent_turns = self.conversations[session_id][-last_n_turns:]
        
        if not recent_turns:
            return "Primeira conversa com este utilizador."
        
        context_parts = []
        
        # User interests
        profile = self.user_profiles.get(session_id)
        if profile and profile.interests:
            context_parts.append(f"Interesses do utilizador: {', '.join(profile.interests[:3])}")
        
        # Recent conversation
        context_parts.append(f"Últimas {len(recent_turns)} interações:")
        for turn in recent_turns[-3:]:  # Show last 3 turns
            context_parts.append(f"- Perguntou sobre: {turn.user_message[:100]}...")
        
        return "\n".join(context_parts)
    
    def get_user_interests(self, session_id: str) -> List[str]:
        """Get user's main interests"""
        profile = self.user_profiles.get(session_id)
        return profile.interests if profile else []
    
    def suggest_follow_up_questions(self, session_id: str) -> List[str]:
        """Suggest relevant follow-up questions based on conversation history"""
        profile = self.user_profiles.get(session_id)
        if not profile:
            return [
                "Gostaria de conhecer melhor o Cristóvão Norte?",
                "Quer saber sobre as nossas propostas para Faro?",
                "Tem curiosidade sobre algum candidato às juntas de freguesia?"
            ]
        
        suggestions = []
        interests = profile.interests
        
        # Suggest based on interests
        if "cristovao" in interests or "presidente" in interests:
            suggestions.append("Quer saber mais sobre a visão do Cristóvão Norte para Faro?")
        
        if "macario" in interests or "assembleia" in interests:
            suggestions.append("Gostaria de conhecer melhor o papel da Assembleia Municipal?")
        
        if "programa" in interests or "propostas" in interests:
            suggestions.append("Há alguma área específica do programa que o interessa mais?")
        
        if "freguesia" in interests:
            suggestions.append("Quer saber sobre os candidatos de alguma freguesia específica?")
        
        # Default suggestions if no specific interests
        if not suggestions:
            suggestions = [
                "Há algum tema específico sobre a campanha que o interessa?",
                "Gostaria de saber mais sobre as nossas propostas?",
                "Tem alguma pergunta sobre os candidatos?"
            ]
        
        return suggestions[:3]  # Return max 3 suggestions
    
    def _update_user_profile(self, session_id: str, user_message: str, source: str):
        """Update user profile based on interaction"""
        now = datetime.now().isoformat()
        message_lower = user_message.lower()
        
        # Extract interests from message
        interests = []
        if any(word in message_lower for word in ['cristóvão', 'cristovao', 'norte']):
            interests.append('cristovao')
        if any(word in message_lower for word in ['macário', 'macario']):
            interests.append('macario')
        if 'assembleia' in message_lower:
            interests.append('assembleia')
        if any(word in message_lower for word in ['programa', 'proposta', 'medida']):
            interests.append('programa')
        if any(word in message_lower for word in ['junta', 'freguesia']):
            interests.append('freguesia')
        if any(word in message_lower for word in ['economia', 'emprego', 'empresa']):
            interests.append('economia')
        if any(word in message_lower for word in ['ambiente', 'sustentabilidade']):
            interests.append('ambiente')
        
        if session_id in self.user_profiles:
            # Update existing profile
            profile = self.user_profiles[session_id]
            profile.last_active = now
            profile.total_messages += 1
            
            # Add new interests (keep unique, max 10)
            for interest in interests:
                if interest not in profile.interests:
                    profile.interests.append(interest)
            profile.interests = profile.interests[-10:]  # Keep last 10
            
            # Update query patterns
            if len(user_message) > 50:
                profile.conversation_style = "detailed"
            elif len(user_message) < 20:
                profile.conversation_style = "brief"
            else:
                profile.conversation_style = "conversational"
                
        else:
            # Create new profile
            self.user_profiles[session_id] = UserProfile(
                session_id=session_id,
                first_seen=now,
                last_active=now,
                total_messages=1,
                interests=interests,
                frequent_queries=[],
                conversation_style="conversational"
            )
    
    def _clean_old_conversations(self):
        """Remove conversations older than max_age_days"""
        cutoff_date = datetime.now() - timedelta(days=self.max_age_days)
        
        sessions_to_remove = []
        for session_id, turns in self.conversations.items():
            if turns:
                last_turn_date = datetime.fromisoformat(turns[-1].timestamp.replace('Z', '+00:00').replace('+00:00', ''))
                if last_turn_date < cutoff_date:
                    sessions_to_remove.append(session_id)
        
        for session_id in sessions_to_remove:
            del self.conversations[session_id]
            if session_id in self.user_profiles:
                del self.user_profiles[session_id]
        
        if sessions_to_remove:
            print(f"🧹 Cleaned {len(sessions_to_remove)} old conversation sessions")
    
    def get_memory_stats(self) -> Dict[str, Any]:
        """Get memory system statistics"""
        total_turns = sum(len(turns) for turns in self.conversations.values())
        return {
            'total_sessions': len(self.conversations),
            'total_conversation_turns': total_turns,
            'active_users': len(self.user_profiles),
            'memory_file_exists': os.path.exists(self.memory_file)
        }

# Global memory instance
conversation_memory = ConversationMemory()
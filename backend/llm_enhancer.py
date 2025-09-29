#!/usr/bin/env python3
"""
LLM Response Enhancer
Optional system to make responses more natural using OpenAI or local models
Only reformulates existing content - never generates new information
"""

import os
import json
from typing import Optional, Dict, Any
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class LLMEnhancer:
    """Enhances response naturalness while preserving all factual content"""
    
    def __init__(self, provider: str = "none"):
        """
        Initialize LLM enhancer
        provider: "openai", "ollama", "none" (disabled)
        """
        self.provider = provider.lower()
        self.enabled = provider != "none"
        self.client = None
        self.model = None
        
        if self.enabled:
            self._initialize_provider()
    
    def _initialize_provider(self):
        """Initialize the selected LLM provider"""
        try:
            if self.provider == "openai":
                self._init_openai()
            elif self.provider == "ollama":
                self._init_ollama()
        except Exception as e:
            print(f"⚠️ LLM enhancer initialization failed: {e}")
            self.enabled = False
    
    def _init_openai(self):
        """Initialize OpenAI client"""
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            print("⚠️ OPENAI_API_KEY not found. LLM enhancer disabled.")
            self.enabled = False
            return
        
        try:
            import openai
            self.client = openai.OpenAI(api_key=api_key)
            self.model = "gpt-3.5-turbo"  # Cost-effective option
            print("✅ OpenAI enhancer initialized")
        except ImportError:
            print("⚠️ OpenAI library not installed. Run: pip install openai")
            self.enabled = False
    
    def _init_ollama(self):
        """Initialize local Ollama client"""
        try:
            import requests
            # Test Ollama connection
            response = requests.get("http://localhost:11434/api/tags", timeout=5)
            if response.status_code == 200:
                self.client = "ollama"
                self.model = "llama2:7b"  # Default local model
                print("✅ Ollama enhancer initialized")
            else:
                raise Exception("Ollama not running")
        except Exception as e:
            print(f"⚠️ Ollama not available: {e}")
            self.enabled = False
    
    def enhance_response(self, original_response: str, user_query: str, 
                        context: Optional[str] = None) -> str:
        """
        Enhance response naturalness while preserving all factual content
        
        Args:
            original_response: The structured response from our system
            user_query: Original user question
            context: Optional conversation context
            
        Returns:
            Enhanced natural response or original if enhancement fails
        """
        if not self.enabled or not original_response:
            return original_response
        
        # Safety check - don't enhance if response is too short (likely error)
        if len(original_response.strip()) < 50:
            return original_response
        
        try:
            enhanced = self._call_llm(original_response, user_query, context)
            
            # Validation: Enhanced response should be similar length and contain key info
            if self._validate_enhanced_response(original_response, enhanced):
                return enhanced
            else:
                print("⚠️ Enhanced response validation failed, using original")
                return original_response
                
        except Exception as e:
            print(f"⚠️ LLM enhancement failed: {e}")
            return original_response
    
    def _call_llm(self, original_response: str, user_query: str, 
                  context: Optional[str] = None) -> str:
        """Call the configured LLM provider"""
        
        prompt = self._build_enhancement_prompt(original_response, user_query, context)
        
        if self.provider == "openai":
            return self._call_openai(prompt)
        elif self.provider == "ollama":
            return self._call_ollama(prompt)
        else:
            return original_response
    
    def _build_enhancement_prompt(self, original_response: str, user_query: str,
                                 context: Optional[str] = None) -> str:
        """Build the enhancement prompt"""
        
        context_part = f"\nContexto da conversa: {context}" if context else ""
        
        prompt = f"""Tu és um assistente de campanha política em Portugal. Reformula a resposta seguinte para ser mais natural e conversacional, mas MANTÉM TODA A INFORMAÇÃO FACTUAL EXATAMENTE IGUAL.

Pergunta do eleitor: {user_query}{context_part}

Resposta original estruturada:
{original_response}

INSTRUÇÕES IMPORTANTES:
1. Mantém TODOS os factos, números, nomes e informações exatos
2. Torna a linguagem mais fluente e natural em português
3. Mantém o mesmo comprimento aproximado
4. Preserva formatação importante (listas, títulos)
5. Nunca inventes informação nova
6. Se mencionares candidatos, usa apenas os nomes que estão na resposta original

Resposta reformulada:"""
        
        return prompt
    
    def _call_openai(self, prompt: str) -> str:
        """Call OpenAI API"""
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "És um especialista em comunicação política em Portugal. Reformulas textos mantendo toda a informação factual."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800,
            temperature=0.3,  # Low temperature for consistency
            top_p=0.9
        )
        return response.choices[0].message.content.strip()
    
    def _call_ollama(self, prompt: str) -> str:
        """Call local Ollama model"""
        import requests
        
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.3,
                    "top_p": 0.9,
                    "max_tokens": 800
                }
            },
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()["response"].strip()
        else:
            raise Exception(f"Ollama API error: {response.status_code}")
    
    def _validate_enhanced_response(self, original: str, enhanced: str) -> bool:
        """Validate that enhanced response preserves key information"""
        
        # Basic validation checks
        if not enhanced or len(enhanced.strip()) < 30:
            return False
        
        # Length check - shouldn't be dramatically different
        length_ratio = len(enhanced) / len(original)
        if length_ratio < 0.5 or length_ratio > 2.0:
            return False
        
        # Key name preservation check (sample of important names)
        key_names = ["Cristóvão Norte", "Macário Correia", "Faro", "Assembleia Municipal"]
        for name in key_names:
            if name in original and name not in enhanced:
                return False
        
        # Check for signs of hallucination (common AI mistakes)
        hallucination_indicators = [
            "não posso", "desculpa", "não tenho informação",
            "como AI", "como assistente", "não sei"
        ]
        
        enhanced_lower = enhanced.lower()
        for indicator in hallucination_indicators:
            if indicator in enhanced_lower:
                return False
        
        return True
    
    def get_status(self) -> Dict[str, Any]:
        """Get enhancer status information"""
        return {
            "enabled": self.enabled,
            "provider": self.provider,
            "model": self.model,
            "available": self.client is not None
        }

# Global enhancer instance - can be configured via environment
# Set LLM_PROVIDER=openai or LLM_PROVIDER=ollama to enable
llm_enhancer = LLMEnhancer(provider=os.getenv("LLM_PROVIDER", "none"))
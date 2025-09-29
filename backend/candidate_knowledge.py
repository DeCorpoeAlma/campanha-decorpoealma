#!/usr/bin/env python3
"""
Candidate Knowledge Base
Structured data about all candidates for the "Faro. De Corpo e Alma" campaign
"""

# Main candidates for municipality
MAIN_CANDIDATES = {
    "cristovao_norte": {
        "name": "Cristóvão Norte", 
        "role": "Presidente da Câmara Municipal",
        "description": "👤 Nasceu a 6 de agosto de 1976\n🎓 Licenciado em Direito (UCP) e Economia (UAlg)\n🏛️ Deputado AR (5 legislaturas), Vice-Presidente GP PSD\n🏛️ Presidente PSD/Algarve, Presidente AM Faro\n⚽ Presidente AG SC Farense, Prof. ténis, atleta\n🏥 Autor de petições: Hospital Central e Medicina"
    },
    "macario_correia": {
        "name": "Macário Correia",
        "role": "Cabeça de Lista da Assembleia Municipal", 
        "description": "👤 68 anos, natural de Santo Estêvão, Tavira\n🎓 Eng. Agronómica (ISA), Mestre Economia Rural (França)\n🏛️ Secretário Estado Ambiente (1987-1991)\n🏛️ Deputado AR (1991-1998), Presidente CM Tavira/Faro\n🇪🇺 Membro Comité das Regiões UE (1998-2013)\n🏅 Grande-Oficial Ordem Mérito (2006)"
    }
}

# ==================== LISTAS ELEITORAIS ====================

# CÂMARA MUNICIPAL - Lista para Executivo Municipal
CAMARA_MUNICIPAL = {
    "presidente": "Cristóvão Norte",
    "vereadores": [
        "Gonçalo Duarte Gomes", "Teresa Correia", "Raquel Ponte", "Bruno Gomes", 
        "Elsa Maia", "Rodrigo Borges de Freitas", "Carlos Gonçalves", "Cátia Morais Gomes",
        "Rui Gago", "Inês Nicau", "João Neves", "Carlos Mota", "Vera Nascimento", 
        "Nuno Pintassilgo", "António Mateus", "Clarinda Viana", "Susana Valente"
    ],
    "total_candidatos": 18,
    "descricao": "Lista para o executivo municipal que governará Faro"
}

# ASSEMBLEIA MUNICIPAL - Órgão fiscalizador
ASSEMBLEIA_MUNICIPAL = {
    "cabeca_lista": "Macário Correia",
    "candidatos": [
        "Alexandra Rodrigues", "Francisco Soares", "Daniel Viegas", "Lília Martins",
        "Adriano Guerra", "Carlos de Deus Pereira", "Adriana Martins", "Carlos Gonçalves",
        "Manuel Mestre", "Claudia Luz", "Andreia Baião", "Paulo de Oliveira Botelho",
        "Filipe Beato", "Berta Dias", "Marta Correia", "António Gonçalves",
        "Teresa Correia", "Pedro Silva", "Pedro Bettencourt", "Eva Contreiras",
        "João Arroja Neves", "Ossama Solayman", "Rita Luís", "João Viegas",
        "Nataliya Borysenkova", "Pedro Cavaco", "Sara Gomes", "Filipe Nascimento",
        "Liliana Teixeira", "Álvaro Patrício", "Helder Ramos", "Mariana Lisboa",
        "Carlos Rita", "Mariana Melentii Rocha", "João Pirbhay Rodrigues", "Iurie Sleptov",
        "Maria Lisete Pereira", "Diogo Telo", "Gonçalo M. Santos", "Vanda Baião",
        "Pedro Bandeira", "Joaquim Sousa", "Maria Eugénia Mendonça", "Luis Vaz",
        "Aura Nóbrega", "Isabel Van der Keller", "Álvaro Carvalho", "Laura Lage",
        "Maria Ana Martins", "José Carlos Júnior", "Rita Nair", "Pedro Cláudio", "Fernando Silva"
    ],
    "total_candidatos": 54,  # Cabeça de lista + 53 candidatos
    "descricao": "Órgão que fiscaliza e aprova as decisões da Câmara Municipal"
}

# JUNTAS DE FREGUESIA - Candidatos por freguesia
JUNTAS_FREGUESIA = {
    "faro_se_sao_pedro": {
        "presidente": "Bruno Lage",
        "freguesia": "Faro (Sé e São Pedro)",
        "populacao": "Cerca de 25.000 habitantes",
        "descricao": "A maior freguesia do concelho, incluindo o centro histórico"
    },
    "montenegro": {
        "presidente": "Virgínia Alpestana",
        "freguesia": "Montenegro", 
        "populacao": "Cerca de 1.500 habitantes",
        "descricao": "Freguesia rural com forte identidade agrícola"
    },
    "estoi": {
        "presidente": "Patricia Cadete",
        "freguesia": "Estoi",
        "populacao": "Cerca de 4.000 habitantes", 
        "descricao": "Conhecida pelo Palácio de Estói e património arqueológico"
    },
    "santa_barbara_nexe": {
        "presidente": "Eva Mendonça",
        "freguesia": "Santa Bárbara de Nexe",
        "populacao": "Cerca de 2.800 habitantes",
        "descricao": "Freguesia com forte componente rural e turística"
    },
    "conceicao": {
        "presidente": "João Ferradeira", 
        "freguesia": "Conceição",
        "populacao": "Cerca de 8.000 habitantes",
        "descricao": "Freguesia em crescimento com novas urbanizações"
    }
}

# Manter compatibilidade com código existente
CM_CANDIDATES = CAMARA_MUNICIPAL["vereadores"]
AM_CANDIDATES = [ASSEMBLEIA_MUNICIPAL["cabeca_lista"]] + ASSEMBLEIA_MUNICIPAL["candidatos"]

# Parish candidates (Candidatos às Juntas de Freguesia)
PARISH_CANDIDATES = {
    "faro_se_sao_pedro": {
        "candidate": "Bruno Lage",
        "parish": "Faro (Sé e São Pedro)",
        "bio": "🎓 Engenheiro do Ambiente, Mestre em Políticas Ambientais\n👤 Nasceu em 1977 em Faro\n🏛️ Presidente da Junta desde 2017\n🌱 Fundador da FARO 1540 e Confraria Marinha da Ria Formosa\n⚖️ Membro da Ordem dos Engenheiros desde 2002"
    },
    "montenegro": {
        "candidate": "Virgínia Alpestana", 
        "parish": "Montenegro",
        "bio": "👤 Nasceu em 1956 em Loulé\n🎓 Professora aposentada\n🏛️ Diretora Regional do Instituto Português da Juventude\n🗳️ Presidente da Junta desde 2021\n💼 No executivo da Junta desde 2009"
    },
    "estoi": {
        "candidate": "Patricia Cadete",
        "parish": "Estoi", 
        "bio": "👤 Nasceu em 1981 em Faro, reside em Estoi\n🎓 Licenciada em Assessoria de Administração (UAlg)\n💼 20+ anos no setor dos seguros\n👨‍👩‍👧‍👦 Projetos comunitários e educativos\n🎯 Foco na participação jovem e património local"
    },
    "santa_barbara_nexe": {
        "candidate": "Eva Mendonça",
        "parish": "Santa Bárbara de Nexe",
        "bio": "👤 Nasceu em 1975 em Faro, reside em Bordeira\n🎓 Licenciada em Gestão Financeira (UAlg)\n💼 Contabilista Certificada desde 2001\n🏢 Sócia-gerente da Gestibarra desde 2003\n🎭 Direção da Soc. Recreativa Bordeirense desde 1999"
    },
    "conceicao": {
        "candidate": "João Ferradeira",
        "parish": "Conceição",
        "bio": "👤 Nasceu em 1982 em Faro, cresceu na Conceição\n🎓 Licenciado em Sociologia (UAlg) e Turismo (Surrey-UK)\n💼 Experiência em turismo e educação\n🌾 Atual atividade: agricultura e comércio de frutos secos\n🏠 Reconhecido como trabalhador, prático e disponível"
    }
}

# Campaign team members
CAMPAIGN_TEAM = [
    {"name": "Ana Silva", "role": "Coordenadora de Campanha", "desc": "Comunicação política"},
    {"name": "João Santos", "role": "Responsável Programa", "desc": "Economista, políticas públicas"},
    {"name": "Maria Costa", "role": "Coordenadora Jovem", "desc": "Ativista pelos direitos dos jovens"},
    {"name": "Pedro Almeida", "role": "Coordenador Sénior", "desc": "Voluntário comunitário"}
]

def get_detailed_bio(candidate_key: str) -> str:
    """Get detailed biography for main candidates"""
    if candidate_key == "cristovao_norte":
        return """O Cristóvão Norte tem um percurso político e pessoal muito rico. Nasceu em 1976, é casado e pai de dois filhos.

Formou-se em Direito pela Universidade Católica e em Economia pela Universidade do Algarve, e ainda fez uma pós-graduação em Estudos Europeus. A ligação ao mar também é forte - tem estudos avançados nessa área.

Na política, foi deputado durante cinco legislaturas diferentes, o que mostra a confiança que os eleitores sempre depositaram nele. Atualmente é vice-presidente do grupo parlamentar do PSD e presidente da Assembleia Municipal de Faro. Também já foi chefe de gabinete na presidência da Câmara de Faro.

No desporto, é presidente da Assembleia Geral do Sporting Clube Farense e da Associação de Ténis do Algarve. Como atleta, chegou a representar o Algarve no futebol e foi campeão regional de ténis.

O que mais me marca nele são as iniciativas que tomou pelos algarvios - organizou uma petição para o Hospital Central do Algarve que juntou mais de 9 mil assinaturas, e outra para o curso de Medicina que reuniu 10 mil pessoas em 2006. Isto mostra que não é só na política formal que ele luta pela região."""
    
    elif candidate_key == "macario_correia":
        return """O Macário Correia é uma figura muito respeitada em Faro e no Algarve. Tem 68 anos, é natural de Santo Estêvão em Tavira e é pai de três filhos.

A formação dele é impressionante - é engenheiro agrónomo e arquiteto paisagista, fez mestrado em Economia Rural em França, e ainda iniciou um doutoramento em Engenharia do Ambiente.

O percurso político é extraordinário: foi secretário de Estado do Ambiente, deputado durante sete anos onde presidiu à Comissão de Saúde, presidente da Câmara de Tavira durante mais de uma década, depois presidente da Câmara de Faro, e ainda foi vereador em Lisboa.

A dimensão europeia da carreira é fascinante - foi membro do Comité das Regiões da União Europeia durante 15 anos e vice-presidente da Comissão de Ambiente. Também foi membro do Comité Económico e Social.

O reconhecimento veio com várias distinções, incluindo o grau de Grande-Oficial da Ordem do Mérito atribuído pelo Presidente Jorge Sampaio em 2006, e a Medalha de Ouro da Cidade de Tavira.

Hoje continua ativo em várias associações ligadas à agricultura e ao desenvolvimento rural do Algarve."""
    
    return None

def get_candidate_info(query: str) -> str:
    """Get candidate information based on query"""
    query_lower = query.lower()
    
    # Check for detailed biography requests
    if any(word in query_lower for word in ['biografia', 'bio', 'vida', 'percurso', 'carreira']):
        if any(word in query_lower for word in ['cristóvão', 'cristovao', 'norte']):
            return get_detailed_bio("cristovao_norte")
        if any(word in query_lower for word in ['macário', 'macario', 'correia']):
            return get_detailed_bio("macario_correia")
    
    # Main candidates - basic info
    if any(word in query_lower for word in ['cristóvão', 'cristovao', 'norte']):
        candidate = MAIN_CANDIDATES["cristovao_norte"]
        return f"**{candidate['name']}** - {candidate['role']}\n\n{candidate['description']}"
    
    if any(word in query_lower for word in ['macário', 'macario', 'correia']):
        candidate = MAIN_CANDIDATES["macario_correia"] 
        return f"**{candidate['name']}** - {candidate['role']}\n\n{candidate['description']}"
    
    # Parish candidates
    parish_queries = {
        'bruno': 'faro_se_sao_pedro',
        'lage': 'faro_se_sao_pedro',
        'virgínia': 'montenegro', 
        'virginia': 'montenegro',
        'alpestana': 'montenegro',
        'patricia': 'estoi',
        'cadete': 'estoi', 
        'eva': 'santa_barbara_nexe',
        'mendonça': 'santa_barbara_nexe',
        'mendonca': 'santa_barbara_nexe',
        'joão': 'conceicao',
        'joao': 'conceicao', 
        'ferradeira': 'conceicao'
    }
    
    for keyword, parish_key in parish_queries.items():
        if keyword in query_lower:
            parish = PARISH_CANDIDATES[parish_key]
            return f"**{parish['candidate']}** - Candidato à Junta de Freguesia de {parish['parish']}\n\n{parish['bio']}"
    
    # Órgãos específicos com estrutura organizada
    if 'assembleia' in query_lower:
        if any(word in query_lower for word in ['lidera', 'cabeça', 'lista', 'presidente']):
            return f"A nossa lista para a Assembleia Municipal é liderada pelo {ASSEMBLEIA_MUNICIPAL['cabeca_lista']}, uma pessoa com experiência política extraordinária.\n\n" + \
                   f"A Assembleia Municipal é {ASSEMBLEIA_MUNICIPAL['descricao'].lower()}. Temos {ASSEMBLEIA_MUNICIPAL['total_candidatos']} candidatos no total.\n\n" + \
                   f"Os primeiros candidatos depois do cabeça de lista são: " + ", ".join(ASSEMBLEIA_MUNICIPAL['candidatos'][:8]) + ".\n\n" + \
                   f"Se quiser conhecer todos os candidatos, é só perguntar!"
        else:
            return f"A Assembleia Municipal de Faro é {ASSEMBLEIA_MUNICIPAL['descricao'].lower()}.\n\n" + \
                   f"A nossa lista é liderada pelo {ASSEMBLEIA_MUNICIPAL['cabeca_lista']} e tem {ASSEMBLEIA_MUNICIPAL['total_candidatos']} candidatos no total."
    
    if any(word in query_lower for word in ['câmara', 'camara', 'executivo', 'vereador']):
        if 'lista' in query_lower or 'candidatos' in query_lower:
            return f"A nossa lista para a Câmara Municipal é liderada pelo {CAMARA_MUNICIPAL['presidente']} como candidato a presidente.\n\n" + \
                   f"Esta é {CAMARA_MUNICIPAL['descricao'].lower()}. Os nossos {CAMARA_MUNICIPAL['total_candidatos']} candidatos são:\n\n" + \
                   f"**Presidente:** {CAMARA_MUNICIPAL['presidente']}\n" + \
                   f"**Vereadores:** " + ", ".join(CAMARA_MUNICIPAL['vereadores']) + "."
        else:
            return f"O executivo municipal será liderado pelo {CAMARA_MUNICIPAL['presidente']} como presidente, com uma equipa de {len(CAMARA_MUNICIPAL['vereadores'])} vereadores."
    
    # Freguesias
    if any(word in query_lower for word in ['junta', 'juntas', 'freguesia', 'freguesias']):
        freguesias_info = "Temos candidatos para todas as juntas de freguesia do concelho:\n\n"
        for key, info in JUNTAS_FREGUESIA.items():
            freguesias_info += f"**{info['freguesia']}**: {info['presidente']} ({info['populacao']}) - {info['descricao']}\n\n"
        return freguesias_info.strip()
    
    # Lista geral
    if 'lista' in query_lower or 'listas' in query_lower:
        return f"As nossas listas para as eleições autárquicas são:\n\n" + \
               f"**Câmara Municipal**: {CAMARA_MUNICIPAL['presidente']} (presidente) + {len(CAMARA_MUNICIPAL['vereadores'])} vereadores\n" + \
               f"**Assembleia Municipal**: {ASSEMBLEIA_MUNICIPAL['cabeca_lista']} (cabeça de lista) + {len(ASSEMBLEIA_MUNICIPAL['candidatos'])} candidatos\n" + \
               f"**Juntas de Freguesia**: {len(JUNTAS_FREGUESIA)} candidatos a presidente de junta\n\n" + \
               f"Quer saber mais detalhes sobre algum órgão específico?"
    
    if 'equipa' in query_lower or 'equipe' in query_lower or 'campanha' in query_lower:
        team_info = "**Equipa de Campanha:**\n"
        for member in CAMPAIGN_TEAM:
            team_info += f"• **{member['name']}** - {member['role']} ({member['desc']})\n"
        return team_info
    
    return None

def get_all_candidates_summary() -> str:
    """Get a comprehensive summary of all candidates organized by electoral body"""
    summary = "# Candidatura \"Faro. De Corpo e Alma\"\n\n"
    
    # Câmara Municipal
    summary += f"## Câmara Municipal\n"
    summary += f"**Presidente:** {CAMARA_MUNICIPAL['presidente']}\n"
    summary += f"**Equipa:** {CAMARA_MUNICIPAL['total_candidatos']} candidatos ({CAMARA_MUNICIPAL['descricao'].lower()})\n\n"
    
    # Assembleia Municipal
    summary += f"## Assembleia Municipal\n" 
    summary += f"**Cabeça de Lista:** {ASSEMBLEIA_MUNICIPAL['cabeca_lista']}\n"
    summary += f"**Equipa:** {ASSEMBLEIA_MUNICIPAL['total_candidatos']} candidatos ({ASSEMBLEIA_MUNICIPAL['descricao'].lower()})\n\n"
    
    # Juntas de Freguesia
    summary += f"## Juntas de Freguesia\n"
    for info in JUNTAS_FREGUESIA.values():
        summary += f"**{info['freguesia']}:** {info['presidente']}\n"
    
    summary += f"\nTemos candidatos para todos os órgãos do poder local em Faro!"
    
    return summary
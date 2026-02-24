# REPOSITORY STRUCTURE - Atlas Engine

```text
/
├── .github/          # CI/CD Workflows for versioning
├── _agent/           # Antigravity Skills & Instructions
│   └── skills/       # SKILL.md files for each module (Skills 0-12)
├── _design_system/   # Tokens, Colors, Figma Briefings
│   └── tokens.md
├── _pipeline/        # Executable scripts (Orchestrator)
│   └── run_pipeline.ps1
├── _schema/          # YAML definitions for consistency
│   └── atlas_schema.yaml
├── chapters/         # Generated .md chapters (The Book)
│   ├── pt/           # Capítulos em Português (PT-BR)
│   └── en/           # Chapters in English (EN-US)
├── glossary/         # Bilingual terminology
│   └── terminology.yaml
├── sources/          # PDF/Text scientific articles
└── system_rules.md   # Master Prompt for the Agent
```

#!/usr/bin/env node
/**
 * setup.js — Instalador de dependências para o Exportador Word
 * Atlas Vetorial ICRS — Editora Cultura Médica Brasil
 *
 * Uso: node setup.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCRIPT_DIR = __dirname;
const PKG_DIR = path.join(SCRIPT_DIR, 'node_modules');

console.log('╔══════════════════════════════════════════════════════╗');
console.log('║  Atlas Vetorial ICRS — Setup Word Export             ║');
console.log('║  Editora Cultura Médica Brasil                       ║');
console.log('╚══════════════════════════════════════════════════════╝\n');

// Check if already installed
if (fs.existsSync(path.join(PKG_DIR, 'docx'))) {
  console.log('✅ Dependências já instaladas. Pulando...\n');
  console.log('Para reinstalar, delete a pasta: ' + PKG_DIR);
  process.exit(0);
}

// Create package.json if not exists
const pkgJsonPath = path.join(SCRIPT_DIR, 'package.json');
if (!fs.existsSync(pkgJsonPath)) {
  const pkg = {
    name: 'atlas-word-export',
    version: '1.0.0',
    description: 'Atlas Vetorial ICRS — Word Export Tool',
    main: 'generate_word.js',
    dependencies: {
      docx: '^8.5.0',
      'marked': '^9.1.0',
      'sharp': '^0.33.0'
    }
  };
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
  console.log('📦 package.json criado.\n');
}

const packages = ['docx@^8.5.0', 'marked@^9.1.0'];

console.log('📦 Instalando dependências npm...\n');

for (const pkg of packages) {
  try {
    console.log(`  Instalando ${pkg}...`);
    execSync(`node "${require.resolve('npm/bin/npm-cli.js')}" install ${pkg} --save --prefix "${SCRIPT_DIR}"`, {
      stdio: 'pipe',
      cwd: SCRIPT_DIR
    });
    console.log(`  ✅ ${pkg} instalado.`);
  } catch (e) {
    // Fallback: try npx
    try {
      execSync(`npx --yes npm install ${pkg} --prefix "${SCRIPT_DIR}"`, {
        stdio: 'inherit',
        cwd: SCRIPT_DIR,
        shell: true
      });
      console.log(`  ✅ ${pkg} instalado via npx.`);
    } catch (e2) {
      console.error(`  ❌ Falha ao instalar ${pkg}. Erro: ${e2.message}`);
    }
  }
}

// Simple check
try {
  execSync(`node -e "require('${path.join(SCRIPT_DIR, 'node_modules', 'docx')}')"`, {stdio: 'pipe'});
  console.log('\n✅ Instalação concluída com sucesso!');
  console.log('\nAgora execute:');
  console.log('  node generate_word.js --all');
} catch (e) {
  // Try direct npm install
  console.log('\n⚠️  Tentando instalação direta via npm...');
  try {
    execSync('npm install docx@^8.5.0 marked@^9.1.0 --save', {
      stdio: 'inherit',
      cwd: SCRIPT_DIR,
      shell: true
    });
    console.log('\n✅ Instalação via npm direta concluída!');
  } catch(e3) {
    console.error('\n❌ Não foi possível instalar automaticamente.');
    console.log('\n📋 Instale manualmente:');
    console.log(`   1. Abra o terminal em: ${SCRIPT_DIR}`);
    console.log('   2. Execute: npm install docx marked');
  }
}

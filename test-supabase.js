#!/usr/bin/env node

// Script de teste rápido para Supabase
require('dotenv').config();

// Configurar variáveis de ambiente para Supabase
process.env.DATABASE_TYPE = 'supabase';
process.env.SUPABASE_URL = 'https://jnshddcfwtydlttkenoy.supabase.co';
process.env.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc2hkZGNmd3R5ZGx0dGtlbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NDE5MDQsImV4cCI6MjA3NTUxNzkwNH0.GWVtu7v1sTDKZKZiD1Xst3RBaygM8XpxfOcN2MGzLYQ';
process.env.JWT_SECRET = 'vXurZfjoCWPN4JZf/PTPXXOp8yU54c7cHIZ0vHvQJZ5EGx1A5tZYxWADALY71QJeiCKsbzmjEqu/GvJIZvO9FQ==';

const databaseService = require('./configs/database-config');

async function testSupabase() {
    console.log('🧪 Testando conexão com Supabase...\n');
    
    try {
        // Teste 1: Buscar todos os produtos
        console.log('1️⃣ Testando busca de produtos...');
        const products = await databaseService.getAllProducts();
        console.log(`✅ Produtos encontrados: ${products.length}`);
        if (products.length > 0) {
            console.log(`   Primeiro produto: ${products[0].nome}`);
        }
        
        // Teste 2: Buscar todos os usuários
        console.log('\n2️⃣ Testando busca de usuários...');
        const users = await databaseService.getAllUsers();
        console.log(`✅ Usuários encontrados: ${users.length}`);
        if (users.length > 0) {
            console.log(`   Primeiro usuário: ${users[0].usuario}`);
        }
        
        // Teste 3: Buscar todos os clientes
        console.log('\n3️⃣ Testando busca de clientes...');
        const clients = await databaseService.getAllClients();
        console.log(`✅ Clientes encontrados: ${clients.length}`);
        if (clients.length > 0) {
            console.log(`   Primeiro cliente: ${clients[0].nome} ${clients[0].sobrenome}`);
        }
        
        // Teste 4: Buscar usuário por username
        console.log('\n4️⃣ Testando busca de usuário por username...');
        const user = await databaseService.findUserByUsername('admin');
        if (user) {
            console.log(`✅ Usuário 'admin' encontrado: ID ${user.id}`);
        } else {
            console.log('⚠️ Usuário "admin" não encontrado');
        }

        // Teste 5: Produtos enriquecidos
        console.log('\n5️⃣ Testando campos ricos (image_url, descrições longas)...');
        const enrichedProducts = await databaseService.getAllProducts();
        const withImages = enrichedProducts.filter(p => p.image_url);
        console.log(`✅ Produtos com imagem: ${withImages.length}/${enrichedProducts.length}`);
        
        console.log('\n🎉 Todos os testes passaram! Supabase está funcionando!');
        console.log('\n📋 Próximos passos:');
        console.log('1. Execute o schema SQL no Supabase');
        console.log('2. Teste localmente com: npm start');
        console.log('3. Acesse: http://localhost:3000');
        console.log('4. Teste o cache em: http://localhost:3000/cache.html');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.message);
        console.log('\n🔧 Possíveis soluções:');
        console.log('1. Verifique se executou o schema SQL no Supabase');
        console.log('2. Confirme se as credenciais estão corretas');
        console.log('3. Verifique se o projeto Supabase está ativo');
    }
}

// Executar teste
testSupabase().then(() => {
    process.exit(0);
}).catch(error => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
});

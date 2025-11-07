# SuperDelivery - Plataforma de Delivery Multi-Perfil

## 🚀 Visão Geral

SuperDelivery é uma plataforma completa de delivery que conecta consumidores, comércios locais e entregadores em um único ecossistema integrado.

## ✨ Funcionalidades Implementadas

### 👥 Três Perfis de Usuário

#### 🛍️ Cliente
- Navegação por categorias de restaurantes
- Visualização detalhada de cardápios
- Carrinho de compras interativo
- Processo completo de checkout
- Rastreamento de pedidos em tempo real
- Chat com restaurante e entregador
- Notificações sobre status do pedido

#### 🏪 Lojista
- Dashboard com métricas em tempo real
- Gerenciamento de pedidos (aceitar/recusar/preparar)
- Controle de produtos e estoque
- Atualização de preços e disponibilidade
- Chat com clientes e entregadores
- Notificações de novos pedidos

#### 🏍️ Entregador
- Dashboard de entregas disponíveis
- Sistema online/offline
- Mapa em tempo real com rotas
- Aceitar e gerenciar entregas
- Atualização de status de entrega
- Chat com clientes e restaurantes
- Métricas de ganhos e entregas

### 💬 Sistema de Chat em Tempo Real
- Chat integrado entre os três perfis
- Histórico de mensagens
- Indicadores de perfil (cliente/lojista/entregador)
- Interface moderna e responsiva

### 🔔 Sistema de Notificações Push
- Notificações em tempo real para cada perfil
- Suporte a notificações do navegador
- Alertas visuais com toast
- Ações rápidas nas notificações

### 🗺️ Integração com Mapas
- Visualização de rotas em tempo real
- Marcadores de origem e destino
- Simulação de movimento do entregador
- Estimativa de tempo e distância
- **Preparado para integração com Google Maps API**

## 🔧 Tecnologias Utilizadas

- **React** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes de interface
- **Lucide React** - Ícones
- **Sonner** - Sistema de notificações toast

## 📦 Estrutura do Projeto

```
/components
  /chat
    - ChatWidget.tsx           # Widget de chat entre perfis
  /delivery
    - DeliveryDashboard.tsx    # Dashboard do entregador
    - DeliveryHeader.tsx       # Cabeçalho do entregador
    - RealTimeMap.tsx          # Mapa em tempo real
  /merchant
    - MerchantDashboard.tsx    # Dashboard do lojista
    - MerchantHeader.tsx       # Cabeçalho do lojista
    - OrdersListWithNotifications.tsx  # Lista de pedidos com notificações
    - ProductsManager.tsx      # Gerenciador de produtos
  /notifications
    - NotificationSystem.tsx   # Sistema de notificações push
  - ProfileSelector.tsx        # Seletor de perfil inicial
  - RestaurantCard.tsx         # Card de restaurante
  - RestaurantMenu.tsx         # Menu do restaurante
  - Cart.tsx                   # Carrinho de compras
  - Checkout.tsx               # Processo de checkout
  - OrderConfirmation.tsx      # Confirmação de pedido
```

## 🚀 Próximos Passos para Produção

### Integração com Google Maps
Para integrar o Google Maps real, siga estes passos:

1. **Obter API Key do Google Maps:**
   - Acesse [Google Cloud Console](https://console.cloud.google.com)
   - Ative as APIs: Maps JavaScript API, Directions API, Geolocation API
   - Crie uma chave de API

2. **Instalar biblioteca:**
   ```bash
   npm install @googlemaps/react-wrapper
   ```

3. **Substituir o componente RealTimeMap:**
   ```tsx
   import { Wrapper } from '@googlemaps/react-wrapper';
   
   // Use os componentes do Google Maps
   // Implemente markers para pickup, delivery e rider
   // Use Directions API para rota otimizada
   ```

### Integração com Backend (Supabase Recomendado)
Para tornar o sistema totalmente funcional em produção:

1. **Database Schema:**
   - Tabela `users` (com role: customer/merchant/delivery)
   - Tabela `restaurants`
   - Tabela `products`
   - Tabela `orders` (com status e timestamps)
   - Tabela `deliveries`
   - Tabela `chat_messages`

2. **Realtime Subscriptions:**
   ```typescript
   // Exemplo de subscription para novos pedidos
   supabase
     .from('orders')
     .on('INSERT', payload => {
       // Notificar lojista de novo pedido
     })
     .subscribe();
   ```

3. **Autenticação:**
   ```typescript
   // Supabase Auth com roles
   const { data, error } = await supabase.auth.signUp({
     email: 'user@example.com',
     password: 'password',
     options: {
       data: { role: 'customer' }
     }
   });
   ```

4. **Geolocalização em Tempo Real:**
   ```typescript
   // Atualizar localização do entregador
   navigator.geolocation.watchPosition(position => {
     supabase
       .from('deliveries')
       .update({ 
         lat: position.coords.latitude,
         lng: position.coords.longitude 
       })
       .eq('id', deliveryId);
   });
   ```

### Push Notifications Reais
1. **Firebase Cloud Messaging (FCM):**
   ```bash
   npm install firebase
   ```

2. **Implementar Service Worker para notificações em segundo plano**

3. **Webhook para eventos do Supabase que disparam notificações**

## 🎯 Funcionalidades Demonstradas

- ✅ Arquitetura multi-perfil escalável
- ✅ Sistema de chat em tempo real (simulado)
- ✅ Notificações push (simuladas com browser notifications)
- ✅ Mapa interativo com rastreamento (preparado para Google Maps)
- ✅ Gerenciamento completo de pedidos
- ✅ Carrinho e checkout funcional
- ✅ Dashboard com métricas
- ✅ Controle de estoque e produtos
- ✅ Interface responsiva e moderna

## 📱 Como Usar

1. **Selecione um perfil:** Cliente, Lojista ou Entregador
2. **Explore as funcionalidades** específicas de cada perfil
3. **Teste o chat** - funciona entre todos os perfis
4. **Observe as notificações** - aparecem automaticamente conforme ações
5. **Troque de perfil** usando o botão "Trocar Perfil" para ver diferentes perspectivas

## 🔐 Segurança

**Importante:** Esta é uma versão de demonstração. Para produção:
- Implemente autenticação real com JWT
- Use HTTPS em todas as comunicações
- Valide todos os inputs no backend
- Implemente rate limiting
- Não armazene dados sensíveis no frontend
- Use variáveis de ambiente para API keys

## 📄 Licença

Projeto de demonstração - SuperDelivery

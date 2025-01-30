

Este projeto é uma aplicação Angular que utiliza o JSON Server como API para realizar operações **CRUD** (GET, POST, PUT) relacionadas a moedas. A aplicação inclui um sistema de autenticação básico que protege as rotas internas. Os dados de autenticação são armazenados no **localStorage**, já que é um ambiente de teste.

---

### **Funcionalidades da Aplicação**

1. **Autenticação de Usuário**  
   - **Login** e **Signup**:
     - Os usuários podem se cadastrar e realizar login.
     - As credenciais dos usuários (como nome de usuário e senha) são armazenadas em localStorage para simplificar a implementação.
   - **Proteção de Rotas**:
     - Apenas usuários autenticados podem acessar as rotas internas (home e suas subpáginas). Caso um usuário tente acessar uma rota protegida sem estar autenticado, ele será redirecionado para a página de login.

2. **Gerenciamento de Moedas**  
   - **Home**:
     - Tela principal onde o usuário pode navegar para outras funcionalidades relacionadas às moedas.
   - **Get Coins** (`/home/getCoins`):
     - Lista todas as moedas registradas no sistema, obtidas por meio de uma requisição GET ao JSON Server no endpoint `/moedas`.
   - **Create Coin** (`/home/createCoin`):
     - Permite a criação de uma nova moeda.
     - O usuário insere dados como código, nome, sigla e símbolo da moeda. Esses dados são enviados ao JSON Server por meio de uma requisição POST.
   - **Edit Coins** (`/home/editCoins`):
     - Permite editar os dados de uma moeda existente.
     - Os dados atualizados são enviados por meio de uma requisição PUT ao endpoint `/moedas/:id`.

3. **Armazenamento e Manipulação de Dados**  
   - Os dados do usuário são armazenados no localStorage.
   - As operações de GET, POST e PUT são feitas consumindo a API do JSON Server.

4. **Validação de Formulários**  
   - Validações no frontend para campos obrigatórios, como:
     - O nome da moeda deve ter entre 3 e 15 caracteres.
     - A sigla da moeda deve ter exatamente 3 letras maiúsculas.
     - O código da moeda deve ser numérico, entre 1 e 999.
   - Mensagens de erro são exibidas para guiar o usuário em caso de entradas inválidas.

5. **Interface Moderna com Angular Material**  
   - Utiliza Angular Material para um design moderno e responsivo:
     - Formulários estilizados com `mat-form-field`.


// DADOS DE PLANTAS
        const plants = [
            {
                id: 1,
                name: "Monstera Deliciosa",
                category: "Arbustos",
                price: 89.90,
                description: "Planta exotica com folhas grandes e vistosas. Perfeita para ambientes internos com luz indireta.",
                difficulty: "Facil",
                sunlight: "Meia Sombra",
                waterFrequency: "Semanal",
                location: "Sao Paulo, SP"
            },
            {
                id: 2,
                name: "Suculenta Echeveria",
                category: "Suculentas",
                price: 29.90,
                description: "Pequena e resistente, ideal para vasos decorativos. Requer pouca agua.",
                difficulty: "Muito Facil",
                sunlight: "Sol Pleno",
                waterFrequency: "Quinzenal",
                location: "Rio de Janeiro, RJ"
            },
            {
                id: 3,
                name: "Rosa Vermelha",
                category: "Flores",
                price: 45.00,
                description: "Classica flor vermelha, simbolo de amor e beleza. Excelente para presentes.",
                difficulty: "Medio",
                sunlight: "Sol Pleno",
                waterFrequency: "3 vezes por semana",
                location: "Belo Horizonte, MG"
            },
            {
                id: 4,
                name: "Cacto Saguaro",
                category: "Cactos",
                price: 150.00,
                description: "Cacto grande e imponente. Muito resistente e requer minimo cuidado.",
                difficulty: "Muito Facil",
                sunlight: "Sol Pleno",
                waterFrequency: "Mensal",
                location: "Brasilia, DF"
            },
            {
                id: 5,
                name: "Samambaia Americana",
                category: "Samambaias",
                price: 55.00,
                description: "Folhagem delicada e verde exuberante. Perfeita para ambientes umidos.",
                difficulty: "Medio",
                sunlight: "Meia Sombra",
                waterFrequency: "3 vezes por semana",
                location: "Curitiba, PR"
            },
            {
                id: 6,
                name: "Orquidea Branca",
                category: "Flores",
                price: 120.00,
                description: "Flor elegante e sofisticada. Flores duram semanas.",
                difficulty: "Dificil",
                sunlight: "Meia Sombra",
                waterFrequency: "2 vezes por semana",
                location: "Salvador, BA"
            }
        ];

        let cart = [];

        // FUNCOES DE NAVEGACAO
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            window.scrollTo(0, 0);
        }

        // RENDERIZAR PLANTAS
        function renderPlants(containerId, plantsToRender) {
            const container = document.getElementById(containerId);
            container.innerHTML = plantsToRender.map(plant => `
                <div class="plant-card fade-in" onclick="openPlantModal(${plant.id})">
                    <div class="plant-image">
                        🌿
                        <button class="plant-favorite" onclick="event.stopPropagation()">🤍</button>
                    </div>
                    <div class="plant-info">
                        <span class="plant-category">${plant.category}</span>
                        <h3 class="plant-name">${plant.name}</h3>
                        <p class="plant-description">${plant.description}</p>
                        <div class="plant-footer">
                            <span class="plant-price">R$ ${plant.price.toFixed(2)}</span>
                            <button class="plant-add-btn" onclick="event.stopPropagation(); addToCart(${plant.id})">🛒</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // MODAL
        function openPlantModal(plantId) {
            const plant = plants.find(p => p.id === plantId);
            if (!plant) return;

            const modal = document.getElementById('plantModal');
            const modalBody = document.getElementById('modalBody');

            modalBody.innerHTML = `
                <div style="margin-bottom: 24px;">
                    <div style="width: 100%; height: 300px; background: linear-gradient(135deg, var(--primary-light), rgba(20, 184, 166, 0.1)); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 80px; margin-bottom: 24px;">
                        🌿
                    </div>
                </div>
                <span class="plant-category">${plant.category}</span>
                <h2 class="modal-title">${plant.name}</h2>
                <p class="modal-description">${plant.description}</p>
                
                <div class="modal-specs">
                    <div class="spec">
                        <div class="spec-label">Dificuldade</div>
                        <div class="spec-value">${plant.difficulty}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">Luz Solar</div>
                        <div class="spec-value">${plant.sunlight}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">Frequencia de Rega</div>
                        <div class="spec-value">${plant.waterFrequency}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">Localizacao</div>
                        <div class="spec-value">${plant.location}</div>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, var(--primary-light), rgba(20, 184, 166, 0.05)); padding: 16px; border-radius: 12px; margin-bottom: 24px;">
                    <div style="font-size: 14px; color: var(--gray-600); margin-bottom: 8px;">Preco</div>
                    <div style="font-size: 32px; font-weight: bold; color: var(--primary);">R$ ${plant.price.toFixed(2)}</div>
                </div>

                <button class="btn btn-primary" style="width: 100%; height: 48px; font-size: 16px;" onclick="addToCart(${plant.id}); closePlantModal();">
                    Adicionar ao Carrinho
                </button>
            `;

            modal.classList.add('active');
        }

        function closePlantModal() {
            document.getElementById('plantModal').classList.remove('active');
        }

        // CARRINHO
        function addToCart(plantId) {
            const plant = plants.find(p => p.id === plantId);
            const existingItem = cart.find(item => item.id === plantId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...plant, quantity: 1 });
            }

            updateCart();
            alert(`${plant.name} adicionada ao carrinho!`);
        }

        function updateCart() {
            const cartContent = document.getElementById('cartContent');

            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div style="text-align: center; padding: 48px 0;">
                        <div style="font-size: 60px; margin-bottom: 16px;">🛒</div>
                        <p style="color: var(--gray-600); font-size: 18px;">Seu carrinho esta vazio</p>
                        <button class="btn btn-primary" style="margin-top: 24px;" onclick="showPage('catalog')">
                            Explorar Catalogo
                        </button>
                    </div>
                `;
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            cartContent.innerHTML = `
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
                    <div>
                        ${cart.map((item, index) => `
                            <div style="background: var(--white); padding: 16px; border-radius: 12px; margin-bottom: 16px; display: flex; gap: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
                                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, var(--primary-light), rgba(20, 184, 166, 0.1)); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 40px;">🌿</div>
                                <div style="flex: 1;">
                                    <h3 style="font-weight: bold; margin-bottom: 8px;">${item.name}</h3>
                                    <p style="color: var(--gray-600); font-size: 14px; margin-bottom: 12px;">${item.category}</p>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 18px; font-weight: bold; color: var(--primary);">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                                        <button class="btn btn-ghost" onclick="removeFromCart(${index})">✕</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="background: var(--white); padding: 24px; border-radius: 12px; height: fit-content; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
                        <h3 style="font-weight: bold; margin-bottom: 16px;">Resumo do Pedido</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--gray-200);">
                            <span style="color: var(--gray-600);">Subtotal</span>
                            <span style="font-weight: 600;">R$ ${total.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--gray-200);">
                            <span style="color: var(--gray-600);">Entrega</span>
                            <span style="font-weight: 600;">R$ 0,00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 18px;">
                            <span style="font-weight: bold;">Total</span>
                            <span style="font-weight: bold; color: var(--primary);">R$ ${total.toFixed(2)}</span>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; height: 48px; font-size: 16px;">Finalizar Compra</button>
                    </div>
                </div>
            `;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        // FILTROS
        function filterPlants() {
            const category = document.querySelector('input[name="category"]:checked').value;
            const price = document.querySelector('input[name="price"]:checked').value;

            let filtered = plants;

            if (category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }

            if (price !== 'all') {
                const [min, max] = price.split('-').map(p => p === '+' ? Infinity : parseInt(p));
                filtered = filtered.filter(p => p.price >= min && p.price <= max);
            }

            renderPlants('catalogPlants', filtered);
        }

        // BUSCA
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = plants.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
            renderPlants('catalogPlants', filtered);
        });

        // CRIAR ANUNCIO
        function handleCreatePlant(event) {
            event.preventDefault();
            alert('Anuncio criado com sucesso!');
            showPage('home');
        }

        // INICIALIZAR
        window.addEventListener('load', () => {
            renderPlants('featuredPlants', plants.slice(0, 6));
            renderPlants('catalogPlants', plants);
        });

        // FECHAR MODAL AO CLICAR FORA
        document.getElementById('plantModal').addEventListener('click', (e) => {
            if (e.target.id === 'plantModal') {
                closePlantModal();
            }
        });
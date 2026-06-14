# 🍔 Imagens dos Produtos

Esta pasta contém as imagens dos produtos do aplicativo Dio's Hamburgueria.

## Estrutura de Imagens Necessárias

### Hambúrgueres
- `smash-burger.png` - Dio's Smash (Tamanho recomendado: 400x400px)
- `x-bacon.png` - X-Bacon
- `double-smash.png` - Double Smash
- `chicken-crispy.png` - Chicken Crispy
- `veggie-burger.png` - Veggie Burger
- `bbq-smash.png` - BBQ Smash

### Crepes
- `crepe-frango.png` - Crepe Frango
- `crepe-carne-seca.png` - Crepe Carne Seca
- `crepe-brigadeiro.png` - Crepe Brigadeiro
- `crepe-banana.png` - Crepe Banana Caramelada

### Acompanhamentos
- `batata-frita.png` - Batata Frita
- `onion-rings.png` - Onion Rings
- `batata-rustica.png` - Batata Rústica
- `fritas-cheddar.png` - Fritas com Cheddar

### Bebidas
- `coca-cola.png` - Coca-Cola Lata
- `fanta-laranja.png` - Fanta Laranja
- `agua-mineral.png` - Água Mineral
- `suco-laranja.png` - Suco de Laranja
- `milkshake-chocolate.png` - Milkshake Chocolate
- `milkshake-morango.png` - Milkshake Morango

## Recomendações

### Formato de Imagem
- **Formato**: PNG (com transparência) ou JPG
- **Resolução**: 400x400px mínimo
- **Tamanho do arquivo**: 50-200KB cada

### Onde Obter Imagens

#### Opção 1: Unsplash (Gratuito e de Alta Qualidade)
[unsplash.com](https://unsplash.com) - Busque por "burger", "crepe", "fries", "milkshake", etc.

#### Opção 2: Pexels (Gratuito)
[pexels.com](https://pexels.com) - Excelente variedade de fotos de comida

#### Opção 3: Pixabay (Gratuito)
[pixabay.com](https://pixabay.com) - Muitas opções de alimentos

#### Opção 4: Criar com IA
Use ferramentas como:
- [DALL-E](https://openai.com/dall-e-3/)
- [Midjourney](https://www.midjourney.com/)
- [Stable Diffusion](https://stability.ai/)

Com prompts como: "High quality food photography of a gourmet burger on white background"

## Como Adicionar as Imagens

1. Baixe as imagens usando as fontes acima
2. Renomeie os arquivos conforme a lista acima
3. Coloque os arquivos PNG/JPG nesta pasta (`/app/assets/products/`)
4. O aplicativo automaticamente carregará as imagens

## Otimização de Imagens

Para reduzir o tamanho sem perder qualidade:

### Usando ImageOptim (Mac/Windows)
- Download: [imageoptim.com](https://imageoptim.com/)

### Usando TinyPNG Online
- Acesse: [tinypng.com](https://tinypng.com/)
- Arraste as imagens

### Usando Linux (ImageMagick)
```bash
convert input.jpg -quality 85 -resize 400x400 output.jpg
```

## Dicas de Design

- **Fundo branco ou transparente** funciona melhor
- **Evite destaques**: As imagens devem ser claras e centradas
- **Consistência**: Tente manter a mesma perspectiva/ângulo para produtos similares
- **Padding**: Deixe espaço em branco ao redor da comida (não ocupe toda a imagem)

## Status das Imagens

- [ ] Hambúrgueres (6 imagens)
- [ ] Crepes (4 imagens)
- [ ] Acompanhamentos (4 imagens)
- [ ] Bebidas (6 imagens)

**Total: 20 imagens necessárias**

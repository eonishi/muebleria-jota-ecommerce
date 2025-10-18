// Script para poblar la base de datos con valores iniciales (Obviamente para desarrollo).
// Esto lo ejecuta docker-compose al iniciar el contenedor de mongo
// Los valores iniciales son los mismos que estan en el archivo productos.json

// ===================================================
// 🧩 CREAR COLECCIONES
// ===================================================
db.createCollection('productos');


// ===================================================
// 🪴 INSERTAR DATOS DE EJEMPLO
// ===================================================
db.productos.insertMany([
	{
		product_name: "Aparador Uspallata",
		imagen: "Aparador Uspallata.webp",
		description:
			"Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
		price: 180000,
		stock: 10,
		createdAt: new Date(),
		updatedAt: new Date(),
		specifications: {
			Medidas: "180 × 45 × 75 cm",
			Materiales: "Nogal macizo FSC®, herrajes de latón",
			Acabado: "Aceite natural ecológico",
			Peso: "68 kg",
			Capacidad: "6 compartimentos interiores",
		},
	},
	{
		product_name: "Biblioteca Recoleta",
		imagen: "Biblioteca Recoleta.webp",
		description:
			"Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
		price: 95000,
		stock: 10,
		createdAt: new Date(),
		updatedAt: new Date(),
		specifications: {
			Medidas: "100 × 35 × 200 cm",
			Materiales: "Estructura de acero, estantes de roble",
			Acabado: "Laca mate ecológica",
			Capacidad: "45 kg por estante",
			Modulares: "5 estantes ajustables",
		},
	},
	{
		product_name: "Butaca Mendoza",
		imagen: "Butaca Mendoza.webp",
		description:"Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    price: 85000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		specifications: {
			Medidas: "80 × 75 × 85 cm",
			Materiales: "Guatambú macizo, tela bouclé",
			Acabado: "Cera vegetal, tapizado premium",
			Tapizado: "Repelente al agua y manchas",
			Confort: "Espuma alta densidad",
		},
	},
	{
		product_name: "Sillón Copacabana",
		imagen: "Sillón Copacabana.webp",
		description:
"Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
		specifications: {
			Medidas: "90 × 85 × 95 cm",
			Materiales: "Cuero curtido vegetal, acero pintado",
			Acabado: "Cuero anilina premium",
			Rotación: "360° silenciosa y suave",
			Garantía: "10 años en estructura",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 210000,
	},
	{
		product_name: "Mesa de Centro Araucaria",
		imagen: "Mesa de Centro Araucaria.webp",
		description:
"Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
		specifications: {
			Medidas: "90 × 90 × 45 cm",
			Materiales: "Sobre de mármol Patagonia, patas de nogal",
			Acabado: "Mármol pulido, aceite natural en madera",
			Peso: "42 kg",
			"Carga máxima": "25 kg distribuidos",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 150000,
	},
	{
		product_name: "Mesa de Noche Aconcagua",
		imagen: "Mesa de Noche Aconcagua.webp",
		description:
"Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
		specifications: {
			Medidas: "45 × 35 × 60 cm",
			Materiales: "Roble macizo FSC®, herrajes soft-close",
			Acabado: "Barniz mate de poliuretano",
			Almacenamiento: "1 cajón + repisa inferior",
			Características: "Cajón con cierre suave",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 60000,
	},
	{
		product_name: "Cama Neuquén",
		imagen: "Cama Neuquen.webp",
		description:
"Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia, perfecto para dormitorios contemporáneos que buscan paz y simplicidad.",
		specifications: {
			Medidas: "160 × 200 × 90 cm",
			Materiales: "Roble macizo FSC®, tapizado lino",
			Acabado: "Aceite natural, tapizado premium",
			Colchón: "Compatible con colchón 160×200",
			Características: "Cabecero flotante acolchado",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 240000,
	},
	{
		product_name: "Sofá Patagonia",
		imagen: "Sofá Patagonia.webp",
		description:
"Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
		specifications: {
			Medidas: "220 × 90 × 80 cm",
			Estructura: "Madera de eucalipto certificada FSC®",
			Tapizado: "Lino 100% natural premium",
			Relleno: "Espuma HR + plumón reciclado",
			Sostenibilidad: "Materiales 100% reciclables",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 300000,
	},
	{
		product_name: "Mesa Comedor Pampa",
		imagen: "Mesa Comedor Pampa.webp",
		description:
"Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
		specifications: {
			Medidas: "160-240 × 90 × 75 cm",
			Materiales: "Roble macizo FSC®, mecanismo alemán",
			Acabado: "Aceite-cera natural",
			Capacidad: "6-10 comensales",
			Extensión: "Sistema de mariposa central",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 190000,
	},
	{
		product_name: "Sillas Córdoba",
		imagen: "Sillas Córdoba.webp",
		description:
"Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
		specifications: {
			Medidas: "45 × 52 × 80 cm (cada una)",
			Materiales: "Contrachapado nogal, tubo de acero",
			Acabado: "Laca mate, pintura epoxi",
			Apilables: "Hasta 6 sillas",
			Incluye: "Set de 4 sillas",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 120000,
	},
	{
		product_name: "Escritorio Costa",
		imagen: "Escritorio Costa.webp",
		description:
"Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
		specifications: {
			Medidas: "120 × 60 × 75 cm",
			Materiales: "Bambú laminado, herrajes ocultos",
			Acabado: "Laca mate resistente",
			Almacenamiento: "1 cajón con organizador",
			Cables: "Pasacables integrado",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 80000,
	},
	{
		product_name: "Silla de Trabajo Belgrano",
		imagen: "Silla de Trabajo Belgrano.webp",
		description:
"Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
		specifications: {
			Medidas: "60 × 60 × 90-100 cm",
			Materiales: "Malla técnica, tejido reciclado",
			Acabado: "Base cromada, tapizado premium",
			Regulación: "Altura + inclinación respaldo",
			Certificación: "Ergonomía europea EN 1335",
		},
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
		price: 70000,
	},
])
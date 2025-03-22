# GitHub Repository Search - React Native 404 Challenge

Una aplicación móvil desarrollada con React Native (Expo) que permite buscar repositorios de GitHub y gestionar una lista de favoritos.

## Características Principales

- Búsqueda de repositorios de GitHub en tiempo real.
- Visualización de hasta 20 resultados ordenados por estrellas.
- Selección y deselección de repositorios.
- Eliminación de repositorios seleccionados
- Apertura de repositorios en el navegador
- Navegación a detalles de repositorios seleccionados

## Tecnologías Principales

- Expo SDK 52
- React Native 0.76.7
- TypeScript
- Expo Router para navegación basada en archivos
- Zustand para manejo de estado
- AsyncStorage para almacenamiento local

## Estructura del Proyecto

```
├── app/             # Rutas y páginas principales
├── components/      # Componentes reutilizables
├── constants/       # Constantes y configuraciones
├── hooks/           # Hooks personalizados
├── stores/          # Estados globales con Zustand
├── utils/           # Utilidades y helpers
└── assets/          # Recursos estáticos
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo Expo
- `npm run ios` - Inicia la aplicación en el simulador de iOS
- `npm run android` - Inicia la aplicación en el emulador de Android
- `npm run web` - Inicia la aplicación en el navegador web
- `npm test` - Ejecuta las pruebas
- `npm run lint` - Ejecuta el linter

## Requerimientos Funcionales

### Pantalla Principal

- Input de búsqueda con validación (mínimo 3 caracteres).
- Loader durante la búsqueda.
- Listado de resultados (máximo 20) mostrando:
  - Avatar del dueño del repositorio.
  - Nombre del dueño.
  - Nombre del repositorio.
  - Total de estrellas.
- Ordenamiento por cantidad de estrellas.
- Total de estrellas de todos los resultados.
- Funcionalidad de selección/deselección de items.
- Botón para eliminar items seleccionados.
- Botón de navegación a pantalla de seleccionados.

### Pantalla de Seleccionados

- Visualización de repositorios seleccionados.
- Misma información que en la pantalla principal.

## Requisitos Previos

- Node.js (versión LTS recomendada).
- npm o yarn.
- Expo CLI.
- iOS Simulator (para Mac) o Android Studio (para desarrollo Android).

## Instalación

1. Clonar el repositorio
   ```bash
   git clone https://github.com/dbracamonte/rn-404-challenge.git
   cd rn-404-challenge
   ```

2. Instalar dependencias
   ```bash
   npm install
   ```

3. Iniciar el proyecto
   ```bash
   npm start
   ```

## API Utilizada

La aplicación utiliza la [API de búsqueda de GitHub](https://docs.github.com/en/rest/search?apiVersion=2022-11-28) para obtener los repositorios.

## Desarrollo

El proyecto utiliza una estructura basada en archivos para el enrutamiento, lo que significa que puedes crear nuevas páginas simplemente agregando archivos en el directorio `app/`.

## Decisiones técnicas

### Arquitectura y estructura

Decidí estructurar el proyecto siguiendo una arquitectura por capas, separando claramente las responsabilidades:

- **Componentes UI**: Elementos visuales reutilizables, sin lógica de negocio.
- **Componentes de dominio**: Componentes específicos del negocio financiero.
- **Stores**: Gestión de estado global mediante Zustand, separando los estados por dominio.

### Gestión de estado

Elegí Zustand por su simplicidad y rendimiento en comparación con alternativas como Redux. La estructura de stores está organizada por dominio (instrumentos, portfolio, órdenes) para mantener la separación de preocupaciones.

## Testing

El proyecto está configurado con Jest y React Native Testing Library para pruebas unitarias y de integración.

## Entregables

- Repositorio Git
- APK de release

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

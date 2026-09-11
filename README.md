# GestorTaller

Plataforma de gestión para un taller de chapa, pintura y detailing. Desarrollada como Taller de Integración de la carrera Analista de Sistemas, UADER FCyT (sede Oro Verde, ciclo 2026).

## Sobre el proyecto

El taller que da origen a este proyecto opera actualmente sin ningún sistema de gestión: la coordinación de turnos, el historial de reparaciones y la administración de clientes se manejan de forma informal, por teléfono y mensajería personal. GestorTaller reemplaza esa operación por una plataforma centralizada, con dos componentes centrales:

- Gestión integral de clientes, vehículos, órdenes de trabajo, presupuestos y reportes.
- Un motor de asignación de turnos que calcula la disponibilidad de recursos (bahías y mecánicos) y estima la duración de cada trabajo a partir del historial de reparaciones, en lugar de un calendario simple.

La reserva de turnos por parte del cliente se resuelve mediante un bot de Telegram, externo a esta aplicación. El acceso del cliente a esta plataforma se limita a una vista de seguimiento de solo lectura, mediante un enlace único por orden de trabajo, sin necesidad de cuenta.

## Stack tecnológico

- Frontend: Next.js, React
- Backend: Node.js
- Base de datos: PostgreSQL
- UI: shadcn/ui sobre Tailwind CSS
- Control de versiones y gestión: GitHub, GitHub Projects

## Estructura del repositorio

La estructura definitiva se completa a medida que avanza el desarrollo. Organización prevista:

```
/app            rutas y páginas (Next.js)
/components     componentes de interfaz reutilizables
/lib            lógica de negocio y servicios (motor de asignación, presupuestos, reportes)
/prisma          esquema de base de datos y migraciones
/docs           informe técnico, diagramas y brief de diseño
```

## Entorno de desarrollo

Requisitos:

- Node.js 20 o superior
- PostgreSQL 15 o superior
- npm

Configuración:

```
git clone https://github.com/LucasKemerer/gestor-taller
cd gestortaller
npm install
cp .env.example .env
```

Completar en `.env` los datos de conexión a la base de datos local antes de continuar.

```
npm prisma migrate dev
npm dev
```

Esta sección se actualiza a medida que se incorporen dependencias y pasos adicionales de configuración.

## Convenciones de trabajo

- Toda modificación a la rama principal se integra mediante Pull Request, con al menos una revisión aprobada por otro integrante del equipo.
- Las tareas se gestionan como issues en el tablero del proyecto, organizados por fase.
- Los mensajes de commit describen el cambio en modo imperativo y breve (por ejemplo: "agrega historial de estados a orden de trabajo").

## Documentación

La carpeta `/docs` reúne el informe técnico presentado a la cátedra, los diagramas de casos de uso, clases, secuencia y modelo de datos, y el brief de diseño de la interfaz.

## Equipo

- Lucas Kemerer
- Bárbara Cacholatti
- Federico Pastrana

## Cátedra

Taller de Integración, UADER FCyT, sede Oro Verde, ciclo 2026.
Equipo docente: Mg. Diaz Santiago R., Anl. Rios Nuñez Marcos Elias, Lic. Arrejin Martin.

## Licencia

Proyecto desarrollado con fines académicos en el marco de la asignatura Taller de Integración. El caso de negocio corresponde a una empresa real; su uso fuera de este contexto debe acordarse con el equipo del proyecto.

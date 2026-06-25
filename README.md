# GestorTaller - MVP

Un sistema de gestión integral (SaaS) diseñado para talleres de chapa, pintura y detailing. Desarrollado para digitalizar y optimizar el control de vehículos, historial de clientes, presupuestos y órdenes de trabajo, resolviendo problemas reales de trazabilidad en el rubro automotor.

## Tecnologías Utilizadas

Este proyecto está construido con un stack moderno enfocado en la escalabilidad y el tipado estricto:

*   **Frontend:** React, Next.js, Tailwind CSS
*   **Backend:** Node.js, Next.js API Routes
*   **Lenguaje:** TypeScript (Tipado estricto y Programación Orientada a Objetos)
*   **Base de Datos:** PostgreSQL (mediante Prisma ORM) *[Nota: a implementar en próximas fases]*

## Requerimientos Funcionales (MVP)

1.  **Gestión de Clientes:** CRUD (Crear, Leer, Actualizar, Eliminar) de clientes.
2.  **Gestión de Vehículos:** Registro de vehículos asociados a dueños actuales, incluyendo detalles técnicos y notas específicas del estado de la carrocería.
3.  **Órdenes de Trabajo (OT):** Creación de presupuestos y servicios a realizar.
4.  **Trazabilidad Histórica:** Desacoplamiento de la titularidad del vehículo al momento de crear la OT, permitiendo que si un auto cambia de dueño, el historial de reparaciones previas se mantenga asociado al cliente correcto.
5.  **Control de Estados:** Seguimiento del trabajo (Ej: Ingresado -> En Proceso -> Esperando Repuestos -> Terminado).

## Arquitectura y Dominio

El núcleo de la lógica de negocio está modelado utilizando Programación Orientada a Objetos (POO), asegurando que el estado de los datos sea coherente a lo largo del tiempo.

### Diagrama de Clases (Simplificado)

```text
+-------------------+       +-------------------+       +-------------------+
|      Cliente      |       |     Vehiculo      |       |   OrdenTrabajo    |
+-------------------+       +-------------------+       +-------------------+
| - id: string      |       | - id: string      |       | - id: string      |
| - nombre: string  | 1   * | - clienteActual:  | *   1 | - vehiculoId: str |
| - telefono: string|<------|   string (id)     |<------| - clienteId: str  |
| - email: string   |       | - marca: string   |       | - tipo: string    |
+-------------------+       | - modelo: string  |       | - estado: string  |
| + actualizar()    |       | - patente: string |       | - presupuesto: num|
+-------------------+       | - notas: string   |       | - fechaIngreso: d |
                            +-------------------+       +-------------------+
                            | + cambiarDueño()  |       | + cambiarEstado() |
                            +-------------------+       | + facturar()      |
                                                        +-------------------+

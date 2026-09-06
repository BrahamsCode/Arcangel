<h1 align="center">
  Arcangel
</h1>

<p align="center">
  Entorno privado de desarrollo y pruebas
</p>

---

## Qué es esto

Arcangel es un fork privado de [Medusa](https://github.com/medusajs/medusa) (v2.20.1),
renombrado por completo al scope `@arcangel/*`. Se usa como banco de pruebas: modificar
el core, experimentar con módulos propios y evaluar patrones de arquitectura sin afectar
proyectos en producción.

No es una distribución pública ni un producto comercial.

## Requisitos

- Node `^20.19.0 || >=22.12.0`
- PostgreSQL
- Yarn 3.2.1 (incluido vía `packageManager`)

## Puesta en marcha

```bash
yarn install
yarn build
```

Build de un paquete concreto:

```bash
yarn workspace @arcangel/arcangel build
```

## Tests

```bash
yarn test                        # unitarios
yarn test:integration:packages   # integración de paquetes
yarn test:integration:http       # integración HTTP
yarn test:integration:modules    # integración de módulos
```

## Migraciones

Al crear, modificar o eliminar un data model dentro de un módulo, generar la migración
con el script del propio paquete. Nunca escribir el archivo de migración a mano:

```bash
cd packages/modules/<module> && yarn migration:create
```

## Estructura

```
packages/
├── arcangel/          # Paquete principal (@arcangel/arcangel)
├── core/              # Framework, tipos, utils, workflows-sdk, core-flows
├── modules/           # 36 módulos de commerce + 16 providers
├── admin/dashboard/   # Panel de administración en React
├── cli/               # Herramientas de línea de comandos
└── design-system/     # Componentes de UI
```

## Relación con upstream

El remote `upstream` apunta a `medusajs/medusa`. Traer cambios ya **no es directo**:
el renombrado de scope toca más de 11.000 archivos, así que cualquier
`git merge upstream/develop` produce conflictos masivos.

Para incorporar un cambio concreto de upstream, la vía práctica es leer el diff original
y reaplicarlo a mano sobre el código renombrado.

## Licencias

Este repositorio es un derivado de Medusa. Las licencias originales se conservan
**sin modificar** y la titularidad del copyright no ha sido alterada:

- El grueso del código está bajo licencia MIT, copyright de Medusa, Inc.
  (ver [`LICENSE`](LICENSE)).
- Los módulos RBAC y SSO son Enterprise Materials **propiedad de MedusaJS, Inc.**,
  no cubiertos por la MIT (ver [`ENTERPRISE-LICENSE.md`](ENTERPRISE-LICENSE.md)).
  Requieren acuerdo comercial y su redistribución no está permitida.

El renombrado a Arcangel afecta únicamente al branding del código; no transfiere
derechos ni titularidad. Por eso este repositorio se mantiene **privado**.

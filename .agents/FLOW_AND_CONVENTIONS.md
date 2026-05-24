# Flow And Conventions

## API Flow (Current)
Defined in `routes/api.php`.

### Public Auth Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/signin`

### Authenticated Auth Endpoints (`auth:sanctum`)
- `POST /api/auth/signout`
- `GET /api/auth/me`
- `POST /api/auth/profile/update`
- `POST /api/auth/profile/password`

### Public Product Endpoints
- `GET /api/open/products`
- `GET /api/open/products/{id}`

### Authenticated Resource Endpoints
- Categories:
  - `POST /api/categories/reorder`
  - REST `apiResource('categories', ...)`
- Products:
  - REST `apiResource('products', ...)`
- Merchant:
  - `GET /api/merchant`
  - `POST /api/merchant/update`

## UI Shell Flow
- App shell = `Sidebar + Header + page content` in `App.jsx`.
- Sidebar selection is derived from URL path (`selectedMenu`).
- Breadcrumb uses `selectedMenu`.

## Styling Conventions
- Use existing spacing/radius/color language already in components.
- Preserve dual-theme behavior for every new UI element:
  - add both light and `dark:*` classes.
- Do not introduce a different design system in isolated files.

## Editing Conventions For Agents
- Make minimal, focused changes.
- Prefer extending existing components over creating parallel ones.
- Keep prop names and data flow consistent with existing patterns.
- When removing a UI section, also remove unused imports/props.
- If you touch path-based nav, update `menuByPath` and page render logic together.

## Known Important Detail
- Navigation is not React Router-based yet; avoid introducing router-only APIs unless the task is a full migration.

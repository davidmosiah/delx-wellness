# Fleet quality conventions

- **demo-contract** / **readme-contract** gates where demo tools exist
- `server.json` version == `package.json` version
- package-lock root version hygiene on publish
- `npm audit --production` on publish path for top5
- Dependabot: **high severity only**, monthly batch
- Tag + GitHub Release on every npm publish

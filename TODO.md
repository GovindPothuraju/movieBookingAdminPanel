# Build Fix Task

## Steps
- [x] Investigate the Vercel build error (rolldown / visualizer `open: true` issue)
- [x] Confirm local build succeeds
- [x] Approve plan with user
- [x] Update `vite.config.js` to make visualizer conditional and remove `open: true`
- [x] Re-run `npm run build` locally to confirm success
- [x] Redeploy to Vercel to confirm fix (visualizer `open: true` removed / conditional)

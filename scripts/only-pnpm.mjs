// Refuse installs from any package manager other than pnpm.
// npm/yarn would ignore pnpm-workspace.yaml and with it all supply-chain settings.
const agent = process.env.npm_config_user_agent ?? ''
if (!agent.startsWith('pnpm/')) {
  console.error('\nDeze repo gebruikt alleen pnpm (veiligheid). Gebruik: pnpm install\n')
  process.exit(1)
}

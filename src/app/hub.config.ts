export const hubConfig = {
  area: 'BackOffice CashApps',
  period: 'Q3',
  title: 'Resultados, avances e iniciativas',
  subtitle: undefined as string | undefined,
  lead: '@lead', // TBD — replace with actual lead handle
} as const

export type HubConfig = typeof hubConfig

export async function resolvedComponent(Component: any, props?: any) {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}

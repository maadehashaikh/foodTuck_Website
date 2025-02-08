export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-14'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  // process.env.SANITY_API_TOKEN,
  "skk9wvIDXyM2cOEc1l4xS72IvypIgyILBWDG1cbmgzaYryLm9Gz7YDe3QhKlk5cRRAimilvWzOwmHWST5sWfJZqAdqwyhbnthuBP2a552GiPV2TrHR5RpVikoWrKPFTzELdBbwWElDWAML53rfbubof4aXZyGdHc9ISXa6a5w9M9V6cRpWp5",
  'Missing environment variable: SANITY_API_TOKEN'
) 

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

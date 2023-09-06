import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'

beforeEach(cleanup)
expect.extend(matchers)


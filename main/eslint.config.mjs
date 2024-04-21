import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
    {
        ignores: [],
    },

    ...compat.config({
        rules: {
            'curly': 'off',
            'style/brace-style': 'off',
            'max-statements-per-line': 'off',
            'no-console': 'warn'
        },
    })
)
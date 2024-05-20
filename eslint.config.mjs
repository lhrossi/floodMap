import antfu from '@antfu/eslint-config';

export default antfu(
  {
    ignores: [
      '.nuxt',
      '.output',
      'node_modules',
    ],
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },
  {
    rules: {
      /** TYPESCRIPT */
      '@typescript-eslint/indent': [
        'error',
        2,
        {
          ignoredNodes: [
            'TSTypeParameterInstantiation',
          ],
          SwitchCase: 1,
        },
      ],
      /** END TYPESCRIPT */

      /** ARRAY */
      'array-bracket-newline': [
        'error',
        {
          minItems: 1,
        },
      ],
      'array-element-newline': [
        'error',
        {
          minItems: 1,
        },
      ],
      /** END ARRAY */

      /** OBJECT */
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            minProperties: 1,
          },
          ImportDeclaration: {
            minProperties: 4,
          },
        },
      ],
      'object-curly-spacing': [
        'error',
        'always',
      ],
      'object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: false,
        },
      ],
      /** END OBJECT */

      /** STYLE */
      'style/arrow-parens': [
        'error',
        'always',
      ],
      /** END STYLE */

      /** VUE */
      'vue/block-order': [
        'error',
        {
          order: [
            'script',
            'template',
            'style',
          ],
        },
      ],
      'vue/padding-line-between-tags': [
        'error',
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'below',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          ignoreWhenEmpty: true,
          allowEmptyLines: false,
        },
      ],
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenEmpty: true,
        },
      ],
      /** END VUE */

      /** DISABLED */
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'antfu/if-newline': 'off',
      'consistent-return': 'off',
      'default-case': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'max-len': 'off',
      'node/prefer-global/process': 'off',
      'no-bitwise': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'no-undef': 'off',
      'no-underscore-dangle': 'off',
      'no-void': 'off',
      'prefer-const': 'off',
      'style/multiline-ternary': 'off',
      'ts/consistent-type-definitions': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'vue/component-name-in-template-casing': 'off',
      'vue/valid-v-slot': 'off',
      /** END DISABLED */
    },
  },
);

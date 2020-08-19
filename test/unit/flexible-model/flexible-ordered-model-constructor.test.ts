/*
 * Copyright 2020 Coöperatieve Rabobank U.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { assert } from 'chai'
import { ConstructError, FlexibleOrderedModel } from '../../../src'

describe('flexible ordered model field validation', function () {
  it('should throw on missing fields', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: 'a' }, ['a', 'b', 'c'])
    }

    assert.throws(createSut, ConstructError, 'Can\'t construct FlexibleOrderedModel: "b" field is missing')
  })

  it('should throw on empty string', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: '' }, ['a'])
    }

    assert.throws(createSut, ConstructError, 'Can\'t construct FlexibleOrderedModel: "a" field is empty')
  })

  it('should throw on array with empty values', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: ['', '', ''] }, ['a'])
    }

    assert.throws(createSut, ConstructError, 'Can\'t construct FlexibleOrderedModel: "a" field is empty')
  })

  it('should throw on null value', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: null }, ['a'])
    }

    assert.throws(createSut, ConstructError, 'Can\'t construct FlexibleOrderedModel: "a" field is empty')
  })

  it('should throw on undefined value', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: 'a', b: undefined }, ['a', 'b'])
    }

    assert.throws(createSut, ConstructError, 'Can\'t construct FlexibleOrderedModel: "b" field is empty')
  })

  it('should not throw on filled array', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: ['', 'abc-def', ''] }, ['a'])
    }

    assert.doesNotThrow(createSut)
  })

  it('should not throw on falsy values', () => {
    const createSut = () => {
      return new FlexibleOrderedModel({ a: 0, b: false }, ['a', 'b'])
    }

    assert.doesNotThrow(createSut)
  })
})

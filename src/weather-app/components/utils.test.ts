import { findSimilarString } from './utils';

describe('Utils', () => {
  describe('findSimilarString', () => {
    it('should find similar strings', () => {
      const options = ['a', 'b', 'c']
      expect(findSimilarString(options, 'a')).toEqual(['a'])
    })

    it('should be able to match partially strings', () => {
      const options = ['a', 'ab', 'abc']
      expect(findSimilarString(options, 'a')).toEqual(options)
    })
  })
})

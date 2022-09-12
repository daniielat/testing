const video = require('../../../app/helpers/jest-mocks/video');

describe('The video module', () => {
    it('plays video', () => {
      const spyPlay = jest.spyOn(video, 'play');
      const isPlaying = video.play();
    
      expect(spyPlay).toHaveBeenCalled();
      expect(isPlaying).toBe(true);
    });
});

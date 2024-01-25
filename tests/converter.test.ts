import { Converter } from '../index';

describe('Converter', () => {
  it('should convert heading markup to HTML', () => {
    const converter = new Converter();
    const markup = "@ Title";
    const html = converter.convertToHtml(markup);
    expect(html).toEqual('<h1>Title</h1>');
  });
  it('should convert italic markup to HTML', () => {
    const converter = new Converter();
    const markup = "^Italic Text^";
    const html = converter.convertToHtml(markup);
    expect(html).toEqual('<em>Italic Text</em>');
  });

  // Add more test cases as needed
});
``


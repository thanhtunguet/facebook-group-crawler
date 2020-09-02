import type { MessageType } from './config/message-type';
import { Post } from 'models/Post';
import { EOL } from 'os';

console.clear();
console.log('FB Crawler injected');

chrome.runtime.onMessage.addListener(function (message: MessageType, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
  switch (message) {
    case 'get-dom':
      const postDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll('div[data-testid="Keycommand_wrapper_feed_story"]');
      const posts: Post[] = [];
      postDivs.forEach((postDiv: HTMLDivElement) => {
        const post: Post = new Post();

        post.content = '';
        post.links = [];

        const postMessages: NodeListOf<HTMLDivElement> = postDiv.querySelectorAll('div[data-ad-comet-preview="message"]');
        postMessages.forEach((postMessage: HTMLDivElement) => {
          post.content += postMessage.innerText + EOL;
        });
        post.content = post.content.trim();

        const postURLs: NodeListOf<HTMLAnchorElement> = postDiv.querySelectorAll('a[role="link"][tabindex="0"]');
        postURLs.forEach((anchor: HTMLAnchorElement) => {
          const href: string = anchor.getAttribute('href');
          if (/facebook\.com\/(.*)post_id=/.test(href)) {
            const matches: RegExpMatchArray = href.match(/post_id=([0-9]+)/);
            post.id = matches[1];
            post.postURL = window.location.href + `/?post_id=${post.id}`;
          }
        });

        const postLinks: NodeListOf<HTMLAnchorElement> = postDiv.querySelectorAll('a[role="link"][target="_blank"]');
        postLinks.forEach((anchor: HTMLAnchorElement) => {
          const labelID: string = anchor.getAttributeNS('aria', 'labelledby');
          if (labelID) {
            const href: string = anchor.href;
            post.links.push(href);
          }
        });

        posts.push(post);
      });
      sendResponse(posts);
      break;

    case 'console-clear':
      console.clear();
      break;
  }
});

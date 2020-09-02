import { GlobalState } from 'config/global-state';
import { FACEBOOK_GET_DOM_MESSAGE } from 'config/messages';
import { Post } from 'models/Post';
import { EOL } from 'os';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import XLSX, { WorkBook } from 'xlsx';
import './styles/common-styles';

addReactNDevTools();
React.setGlobal<GlobalState>({});

ReactDOM.render(
  <BrowserRouter>

  </BrowserRouter>,
  document.getElementById('root'),
);

window.addEventListener('load', () => {
  chrome.tabs.getSelected(null, (tab) => {
    chrome.tabs.sendMessage(
      tab.id,
      FACEBOOK_GET_DOM_MESSAGE,
      function (posts: Post[]) {
        React.setGlobal<GlobalState>({
          posts,
        });
        const workbook: WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
          ['Index', 'PostId', 'Post URL', 'Content', 'Links'],
          ...posts.map((post: Post, index: number) => {
            return [index, post.id, post.postURL, post.content, post.links.join(EOL)];
          }),
        ]), 'Posts');
        XLSX.writeFile(workbook, 'posts.xlsx');
      }
    );
  });
});

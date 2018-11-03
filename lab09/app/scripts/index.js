import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';
import CommentForm from './CommentForm.js';
import CommentList from './CommentList.js';
import CommentBox from './CommentBox.js';

import '../css/base.css';

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);

/**
 * Created by Administrator on 2016/4/12.
 */

var CommentBox = React.createClass({
    displayName: 'CommentBox',
    render: function () {
        return (
            React.createElement('div', {className: 'CommentBox'}, 'Hello, world! I am a CommentBox.')
        );
    }
});

ReactDom.render(
    React.createElement(CommentBox,null),
    document.getElementById('div1')
);





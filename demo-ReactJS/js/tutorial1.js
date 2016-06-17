/**
 * Created by Administrator on 2016/4/12.
 */


var CommentBox=React.render({
    render:function(){
        return (
            <div className="CommentBox">
                Hello World! I am a CommentBox.
            </div>
        );
    }
});

React.render(
    <CommentBox/>,
    document.getElementById('div1');
)
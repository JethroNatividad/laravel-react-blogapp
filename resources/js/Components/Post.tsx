import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
    title: string;
    content: string;
    author: string;
    created_at: string;
};

const Post = ({ title, content, author, created_at }: Props) => {
    return (
        <div className="rounded-md border p-4">
            <div className="mb-4">
                <p className="font-medium">{author}</p>
                <p className="text-slate-500">{dayjs(created_at).fromNow()}</p>
            </div>

            <div>
                <h1 className="text-2xl">{title}</h1>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default Post;

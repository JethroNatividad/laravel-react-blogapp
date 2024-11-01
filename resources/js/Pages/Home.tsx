import Post from "@/Components/Post";
import Layout from "@/Layouts/Layout";

import { usePoll } from "@inertiajs/react";

type Props = {
    posts: {
        id: number;
        title: string;
        content: string;
        created_at: string;
        user: {
            name: string;
            id: string;
        };
    }[];
};

const Home = ({ posts }: Props) => {
    usePoll(2000, { only: ["posts"] });

    return (
        <Layout>
            <p className="text-2xl mb-6">Posts</p>
            <div className="grid grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        author={post.user.name}
                        created_at={post.created_at}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Home;

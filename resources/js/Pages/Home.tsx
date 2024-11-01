import Post from "@/Components/Post";
import Layout from "@/Layouts/Layout";
import type { Post as TypePost } from "@/types";
import { usePage } from "@inertiajs/react";

type Props = {
    posts: TypePost[];
};

const Home = ({ posts }: Props) => {
    const user = usePage().props.auth.user;

    return (
        <Layout>
            <p className="text-2xl mb-6">Posts</p>
            <div className="grid grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        is_author={user.id === post.user.id}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Home;

import Post from "@/Components/Post";
import Layout from "@/Layouts/Layout";
import { usePage, usePoll } from "@inertiajs/react";
import type { Post as TypePost, User } from "@/types";

type Props = {
    user: User;
    posts: TypePost[];
};

const Posts = ({ posts, user }: Props) => {
    usePoll(2000, { only: ["posts"] });
    const currentUser = usePage().props.auth.user;

    return (
        <Layout>
            <p className="text-2xl mb-6">{user.name}'s Posts</p>
            <div className="grid grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        is_author={currentUser.id === post.user.id}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Posts;

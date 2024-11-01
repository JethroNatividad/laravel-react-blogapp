import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Button } from "./Button";
import { Link } from "@inertiajs/react";
import type { Post as TypePost } from "@/types";

dayjs.extend(relativeTime);

type Props = {
    post: TypePost;
    is_author?: boolean;
};

const Post = ({ post, is_author }: Props) => {
    const { user, created_at, title, content } = post;
    return (
        <div className="rounded-md border p-4">
            <div className="mb-4 flex justify-between items-start">
                <div>
                    <p className="font-medium">
                        <Link href={route("user.posts", user.id)}>
                            {user.name}
                        </Link>
                    </p>
                    <p className="text-slate-500">
                        {dayjs(created_at).fromNow()}
                    </p>
                </div>

                {is_author && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                                ⋮
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-1 flex flex-col">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={route("posts.edit", post.id)}>
                                    Edit
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link
                                    method="delete"
                                    href={route("posts.destroy", post.id)}
                                >
                                    Delete
                                </Link>
                            </Button>
                        </PopoverContent>
                    </Popover>
                )}
            </div>

            <div>
                <h1 className="text-2xl">{title}</h1>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default Post;

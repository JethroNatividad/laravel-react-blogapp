import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import InputError from "@/Components/InputError";
import { Label } from "@/Components/Label";
import { Textarea } from "@/Components/Textarea";
import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";

const Create = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        content: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("posts.store"), { onFinish: () => reset() });
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto">
                <h1 className="text-2xl mb-2">Create a Post</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                        />
                        <InputError message={errors.content} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Post
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default Create;

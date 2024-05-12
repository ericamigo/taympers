import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("job-orders.store"), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex gap-2">
                    <Link href={route("dashboard")}>
                        <i className="bi bi-grid"></i>
                    </Link>
                    <div>
                        <i className="bi bi-chevron-compact-right"></i>
                    </div>
                    <Link href={route("job-orders.index")}>Job Orders</Link>
                    <div>
                        <i className="bi bi-chevron-compact-right"></i>
                    </div>
                    <div>Create</div>
                </div>
            }
        >
            <Head title="Create Job Order" />

            <form onSubmit={submit}>
                <div className="py-12">
                    <div className="max-w-screen-sm mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <PrimaryButton disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

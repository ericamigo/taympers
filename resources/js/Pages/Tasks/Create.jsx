import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Create({ jobOrder }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("tasks.store", jobOrder), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="space-y-1">
                <div className="flex gap-2">
                    <div className="grow">
                        <TextInput
                            id="name"
                            className="block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                            placeholder="Task name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </form>
    );
}

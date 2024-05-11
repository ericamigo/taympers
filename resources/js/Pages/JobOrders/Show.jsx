import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TasksCreate from "@/Pages/Tasks/Create";

export default function Show({ auth, jobOrder, tasks }) {
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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Job Order
                </h2>
            }
        >
            <Head title="Job Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <h1 className="text-5xl font-bold">{jobOrder.name}</h1>
                    </div>
                    <TasksCreate jobOrder={jobOrder} />
                    <div className="rounded-lg bg-white border border-gray-300 shadow-sm">
                        <table className="w-full">
                            <tbody>
                                {tasks.map((task) => {
                                    return (
                                        <tr className="group" key={task.id}>
                                            <td className="p-4 w-10 border-t group-first:border-t-0 font-bold">
                                                {task.name}
                                            </td>
                                            <td className="p-4 w-10 border-t group-first:border-t-0 font-bold text-right">
                                                {task.manhours_count || ""}
                                            </td>
                                            <td className="p-4 w-10 border-t group-first:border-t-0 font-bold text-right">
                                                {
                                                    task.manhours[0]
                                                        ?.total_duration
                                                }
                                            </td>
                                            <td className="p-4 w-10 border-t group-first:border-t-0 font-bold text-right">
                                                <Link
                                                    href={route(
                                                        "manhours.store",
                                                        task
                                                    )}
                                                    method="post"
                                                    as="button"
                                                    type="button"
                                                >
                                                    {auth.user.ongoing_manhour
                                                        ?.task_id === task.id
                                                        ? "End"
                                                        : "Start"}
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {tasks.length === 0 && (
                                    <tr className="group">
                                        <td className="p-4 w-10 border-t group-first:border-t-0 text-center">
                                            No tasks found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

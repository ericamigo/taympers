import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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

    const calcTotalDuration = (manhours) => {
        return manhours
            .map((manhour) => manhour.duration)
            .reduce((a, c) => a + c, 0);
    };

    const secondsToHHMM = (seconds) => {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);

        var hoursString = hours < 10 ? "0" + hours : hours;
        var minutesString = minutes < 10 ? "0" + minutes : minutes;

        return hoursString + ":" + minutesString;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex gap-2">
                    <Link href={route("job-orders.index")}>Job Orders</Link>
                    <div>/</div>
                    <div>{jobOrder.name}</div>
                </div>
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
                                            <td className="p-4 w-10 border-t group-first:border-t-0 font-bold text-right font-mono">
                                                {secondsToHHMM(
                                                    calcTotalDuration(
                                                        task.manhours
                                                    )
                                                )}
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

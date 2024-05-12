import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, jobOrders }) {
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
                    <Link href={route("dashboard")}>
                        <i className="bi bi-grid"></i>
                    </Link>
                    <div>
                        <i className="bi bi-chevron-compact-right"></i>
                    </div>
                    <Link href={route("job-orders.index")}>Job Orders</Link>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <Link
                            href={route("job-orders.create")}
                            className="bg-indigo-500 hover:bg-indigo-600 duration-150 text-white inline-block py-2 px-4 rounded-lg font-bold"
                        >
                            Create Job Order
                        </Link>
                    </div>
                    <div className="rounded-lg bg-white border-gray-300 shadow-sm border">
                        <table className="w-full">
                            <tbody>
                                {jobOrders.map((jobOrder) => {
                                    return (
                                        <tr className="group" key={jobOrder.id}>
                                            <td className="p-4 border-t group-first:border-t-0">
                                                <Link
                                                    href={route(
                                                        "job-orders.show",
                                                        jobOrder
                                                    )}
                                                    className="hover:text-indigo-500 duration-150 font-bold"
                                                >
                                                    {jobOrder.name}
                                                </Link>
                                            </td>
                                            <td className="p-4 border-t group-first:border-t-0 text-right whitespace-nowrap font-mono font-bold">
                                                {secondsToHHMM(
                                                    calcTotalDuration(
                                                        jobOrder.manhours
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {jobOrders.length === 0 && (
                                    <tr className="group">
                                        <td className="p-4 w-10 border-t group-first:border-t-0 text-center">
                                            No job orders found
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

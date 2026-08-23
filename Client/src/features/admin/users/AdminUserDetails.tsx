import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMail,
  FiShield,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import { toast } from "sonner";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAppSelector } from "@/reduxtoolkit/hooks";

import {
  useDeleteUserMutation,
  useUserQuery,
} from "./api/usersQueries";

import UserDetailsSkeleton from "./components/UserDetailsSkeleton";


export default function AdminUserDetails() {

  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();


  const {
    data: user,
    isLoading,
    isError,
  } = useUserQuery(id);

  const currentUser = useAppSelector((state) => state.auth.user);

  const { mutate: deleteUser, isPending: isDeleting } =
    useDeleteUserMutation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const isSelf = Boolean(
    currentUser?.id && user?.id && currentUser.id === user.id,
  );

  const handleDelete = () => {
    if (!user) return;

    deleteUser(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        setDialogOpen(false);
        navigate("/admin/dashboard/users");
      },
      onError: (error) => {
        setDialogOpen(false);

        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ?? "Could not delete user.",
          );
          return;
        }

        toast.error("Could not delete user.");
      },
    });
  };


  if (isLoading) {
    return (
      <UserDetailsSkeleton />
    );
  }


  if (isError || !user) {
    return (

      <div className="space-y-6">

        <Button
          variant="ghost"
         onClick={() => navigate("/admin/dashboard/users")}
        >
          <FiArrowLeft className="mr-2" />
          Back to Users
        </Button>

        <Card>

          <CardContent className="py-16 text-center">

            <p className="font-medium">
              User not found
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              This user may have been deleted.
            </p>

          </CardContent>

        </Card>

      </div>

    );
  }


  const fullName =
    `${user.firstName} ${user.lastName}`.trim();


  const displayName =
    fullName || user.username;


  return (

    <div className="space-y-8">

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <section>

        <div className="flex items-center justify-between">

          <Button
            variant="ghost"
            className="mb-4 -ml-3"
            onClick={() =>
              navigate("/admin/dashboard/users")
            }
          >

            <FiArrowLeft className="mr-2" />

            Back to Users

          </Button>


          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isSelf}
                title={
                  isSelf
                    ? "Use Remove Account from your settings to delete your own account."
                    : undefined
                }
              >
                <FiTrash2 className="mr-2" />
                Delete User
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this user?</DialogTitle>
                <DialogDescription>
                  This will permanently delete{" "}
                  <span className="font-medium">{displayName}</span>. This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete User"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>


        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            User Details
          </h1>

          <p className="mt-2 text-muted-foreground">
            View account information and activity.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* Main */}
      {/* ================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ================================================= */}
        {/* Profile Card */}
        {/* ================================================= */}

        <Card>

          <CardContent className="flex flex-col items-center p-8 text-center">

            {/* Avatar */}

            <div className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-2xl
              font-bold
              text-primary
            ">

              {user.firstName?.[0] ||
                user.username[0]}

              {user.lastName?.[0]}

            </div>


            <h2 className="mt-5 text-xl font-semibold">
              {displayName}
            </h2>


            <p className="mt-1 text-sm text-muted-foreground">
              {user.username}
            </p>


            <div className="mt-4">

              {user.role === "admin" ? (

                <Badge>
                  Admin
                </Badge>

              ) : (

                <Badge variant="secondary">
                  User
                </Badge>

              )}

            </div>

          </CardContent>

        </Card>


        {/* ================================================= */}
        {/* Information */}
        {/* ================================================= */}

        <Card className="lg:col-span-2">

          <CardHeader>

            <CardTitle>
              Account Information
            </CardTitle>

            <CardDescription>
              Personal and account details.
            </CardDescription>

          </CardHeader>


          <CardContent>

            <div className="grid gap-6 sm:grid-cols-2">

              {/* Username */}

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">
                  Username
                </p>

                <div className="flex items-center gap-3">

                  <FiUser className="text-muted-foreground" />

                  <span className="font-medium">
                    @{user.username}
                  </span>

                </div>

              </div>


              {/* Email */}

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <div className="flex items-center gap-3">

                  <FiMail className="text-muted-foreground" />

                  <span className="font-medium break-all">
                    {user.email}
                  </span>

                </div>

              </div>


              {/* First Name */}

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">
                  First Name
                </p>

                <p className="font-medium">
                  {user.firstName || "—"}
                </p>

              </div>


              {/* Last Name */}

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">
                  Last Name
                </p>

                <p className="font-medium">
                  {user.lastName || "—"}
                </p>

              </div>


              {/* Role */}

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">
                  Role
                </p>

                <div className="flex items-center gap-2">

                  <FiShield className="text-muted-foreground" />

                  <span className="font-medium capitalize">
                    {user.role}
                  </span>

                </div>

              </div>


              {/* ID */}

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">
                  User ID
                </p>

                <p className="break-all text-sm font-medium">
                  {user.id}
                </p>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>


      {/* ================================================= */}
      {/* Dates */}
      {/* ================================================= */}

      <Card>

        <CardHeader>

          <CardTitle>
            Account Dates
          </CardTitle>

          <CardDescription>
            Account creation and last update.
          </CardDescription>

        </CardHeader>


        <CardContent>

          <div className="grid gap-6 sm:grid-cols-2">

            {/* Created */}

            <div className="
              flex
              items-center
              gap-4
              rounded-xl
              border
              p-5
            ">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-primary/10
              ">

                <FiCalendar
                  className="text-primary"
                />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Joined
                </p>

                <p className="mt-1 font-medium">

                  {new Date(
                    user.createdAt
                  ).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}

                </p>

              </div>

            </div>


            {/* Updated */}

            <div className="
              flex
              items-center
              gap-4
              rounded-xl
              border
              p-5
            ">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
              ">

                <FiClock
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Last Updated
                </p>

                <p className="mt-1 font-medium">

                  {new Date(
                    user.updatedAt
                  ).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}

                </p>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>

  );
}
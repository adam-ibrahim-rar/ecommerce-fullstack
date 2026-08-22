import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiEye,
  FiMail,
  FiMoreHorizontal,
  FiSearch,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useUsersQuery,
} from "./api/usersQueries";

import type {
  UserRole,
} from "./types/user.types";


// =====================================================
// Component
// =====================================================

export default function AdminUsers() {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState<UserRole | "all">("all");


  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsersQuery({
    search: search || undefined,
    role:
      role === "all"
        ? undefined
        : role,
  });


  // =====================================================
  // Stats
  // =====================================================

  const totalUsers =
    users.length;

  const admins =
    users.filter(
      (user) => user.role === "admin"
    ).length;

  const normalUsers =
    users.filter(
      (user) => user.role === "user"
    ).length;


  return (
    <div className="space-y-8">

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <section>

        <h1 className="text-3xl font-bold tracking-tight">
          Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your customers and user accounts.
        </p>

      </section>


      {/* ================================================= */}
      {/* Stats */}
      {/* ================================================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Total Users
              </p>

              <p className="mt-2 text-2xl font-bold">
                {totalUsers}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

              <FiUsers
                size={21}
                className="text-primary"
              />

            </div>

          </CardContent>

        </Card>


        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Customers
              </p>

              <p className="mt-2 text-2xl font-bold">
                {normalUsers}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">

              <FiUser
                size={21}
                className="text-green-600"
              />

            </div>

          </CardContent>

        </Card>


        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Admins
              </p>

              <p className="mt-2 text-2xl font-bold">
                {admins}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">

              <FiUser
                size={21}
                className="text-blue-600"
              />

            </div>

          </CardContent>

        </Card>

      </section>


      {/* ================================================= */}
      {/* Users */}
      {/* ================================================= */}

      <Card>

        <CardHeader>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <CardTitle>
                All Users
              </CardTitle>

              <CardDescription>
                View and manage registered users.
              </CardDescription>

            </div>


            {/* Filters */}

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Search */}

              <div className="relative">

                <FiSearch
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search users..."
                  className="w-full pl-10 sm:w-[260px]"
                />

              </div>


              {/* Role */}

              <Select
                value={role}
                onValueChange={(value) =>
                  setRole(
                    value as UserRole | "all"
                  )
                }
              >

                <SelectTrigger className="w-full sm:w-[150px]">

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="all">
                    All Roles
                  </SelectItem>

                  <SelectItem value="user">
                    Users
                  </SelectItem>

                  <SelectItem value="admin">
                    Admins
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </div>

        </CardHeader>


        <CardContent>

          {/* Loading */}

          {isLoading && (

            <div className="py-16 text-center text-muted-foreground">
              Loading users...
            </div>

          )}


          {/* Error */}

          {isError && (

            <div className="py-16 text-center text-destructive">
              Failed to load users.
            </div>

          )}


          {/* Desktop */}

          {!isLoading &&
            !isError && (
              <div className="hidden overflow-x-auto md:block">

                <table className="w-full">

                  <thead>

                    <tr className="border-b text-left text-sm text-muted-foreground">

                      <th className="pb-4 font-medium">
                        User
                      </th>

                      <th className="pb-4 font-medium">
                        Email
                      </th>

                      <th className="pb-4 font-medium">
                        Role
                      </th>

                      <th className="pb-4 font-medium">
                        Joined
                      </th>

                      <th className="pb-4 text-right font-medium">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {users.map((user) => (

                      <tr
                        key={user.id}
                        className="border-b last:border-0"
                      >

                        {/* User */}

                        <td className="py-4">

                          <div className="flex items-center gap-3">

                            <div className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-primary/10
                              font-semibold
                              text-primary
                            ">

                              {user.firstName?.[0] ||
                                user.username[0]}

                              {user.lastName?.[0]}

                            </div>

                            <div>

                              <p className="font-medium">

                                {user.firstName ||
                                  user.username}{" "}

                                {user.lastName}

                              </p>

                              <p className="text-sm text-muted-foreground">
                                @{user.username}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Email */}

                        <td className="py-4">

                          <div className="flex items-center gap-2">

                            <FiMail
                              size={15}
                              className="text-muted-foreground"
                            />

                            {user.email}

                          </div>

                        </td>


                        {/* Role */}

                        <td className="py-4">

                          {user.role === "admin" ? (

                            <Badge>
                              Admin
                            </Badge>

                          ) : (

                            <Badge variant="secondary">
                              User
                            </Badge>

                          )}

                        </td>


                        {/* Date */}

                        <td className="py-4 text-sm text-muted-foreground">

                          {new Date(
                            user.createdAt
                          ).toLocaleDateString()}

                        </td>


                        {/* Actions */}

                        <td className="py-4 text-right">

                          <DropdownMenu>

                            <DropdownMenuTrigger asChild>

                              <Button
                                variant="ghost"
                                size="icon"
                              >

                                <FiMoreHorizontal />

                              </Button>

                            </DropdownMenuTrigger>


                            <DropdownMenuContent align="end">

                              <DropdownMenuItem
                                onClick={() =>
                                 navigate(`/admin/dashboard/users/${user.id}`)
                                }
                              >

                                <FiEye className="mr-2" />

                                View User

                              </DropdownMenuItem>

                            </DropdownMenuContent>

                          </DropdownMenu>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            )}


          {/* Mobile */}

          {!isLoading &&
            !isError && (
              <div className="space-y-4 md:hidden">

                {users.map((user) => (

                  <div
                    key={user.id}
                    className="rounded-xl border p-4"
                  >

                    <div className="flex items-start gap-4">

                      <div className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/10
                        font-semibold
                        text-primary
                      ">

                        {user.firstName?.[0] ||
                          user.username[0]}

                        {user.lastName?.[0]}

                      </div>


                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between">

                          <div>

                            <p className="font-medium">

                              {user.firstName ||
                                user.username}{" "}

                              {user.lastName}

                            </p>

                            <p className="truncate text-sm text-muted-foreground">
                              {user.email}
                            </p>

                          </div>


                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                             navigate(`/admin/dashboard/users/${user.id}`)
                            }
                          >

                            <FiEye />

                          </Button>

                        </div>


                        <div className="mt-3 flex gap-2">

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

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}


          {/* Empty */}

          {!isLoading &&
            !isError &&
            users.length === 0 && (

              <div className="py-16 text-center">

                <FiUsers
                  size={40}
                  className="mx-auto text-muted-foreground"
                />

                <p className="mt-4 font-medium">
                  No users found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filter.
                </p>

              </div>

            )}

        </CardContent>

      </Card>

    </div>
  );
}
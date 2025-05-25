import type { Role } from "@server/collections/user/types";
import { DataTableColumnHeader } from "@client/components/data-table/data-table-column-header";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@client/components/ui/avatar";
import { Badge } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@client/components/ui/tooltip";
import { authClient } from "@client/lib/auth-client";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import type { Prettify } from "better-auth";
import type { UserWithRole } from "better-auth/plugins";
import { CheckCircle, MoreHorizontal, XCircle } from "lucide-react";
import { useCallback } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type UserWithRole1 = Prettify<UserWithRole>;
//^?

export const userColumns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "image",
    header: () => <></>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
          <AvatarImage
            src={user.image ?? undefined}
            alt={`${user.name || "User"}'s profile picture`}
          />
          <AvatarFallback className="font-semibold uppercase">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const { email, emailVerified } = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{email}</span>
          {emailVerified ? (
            <CheckCircle
              className="h-4 w-4 text-green-500"
              aria-label="Verified"
            />
          ) : (
            <XCircle
              className="h-4 w-4 text-red-500"
              aria-label="Not verified"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      if (user.role === "user")
        return <Badge variant={"secondary"}>User</Badge>;
      if (user.role === "admin") return <Badge>Admin</Badge>;

      return <Badge variant={"default"}>{user.role}</Badge>;
    },
  },
  {
    accessorKey: "banned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      if (user.banned) {
        // Create tooltip content for banned users
        const tooltipContent = [
          user.banReason && `Reason: ${user.banReason}`,
          user.banExpires &&
            `Expires: ${new Date(user.banExpires).toLocaleDateString()}`,
          !user.banExpires && "Permanent ban",
        ]
          .filter(Boolean)
          .join("\n");

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant={"destructive"}>Banned</Badge>
              </TooltipTrigger>
              <TooltipContent>
                {tooltipContent || "No additional information"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return <Badge variant={"secondary"}>Active</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return row.original.createdAt.toDateString();
    },
  },
  {
    id: "actions",
    cell: function ActionCell({ row }) {
      const user = row.original;
      const queryClient = useQueryClient();

      // Shared callback for query invalidation - prevents recreation on each render
      const invalidateUsers = useCallback(() => {
        return queryClient.invalidateQueries({ queryKey: ["users"] });
      }, [queryClient]);

      // Define mutations with shared onSuccess handler to reduce redundancy
      const removeUserMutation = useMutation({
        mutationKey: ["removeUser", user.id],
        mutationFn: () => authClient.admin.removeUser({ userId: user.id }),
        onSuccess: invalidateUsers,
      });

      const setRoleMutation = useMutation({
        mutationKey: ["setRole", user.id],
        mutationFn: (role: Role["role"]) =>
          authClient.admin.setRole({ userId: user.id, role }),
        onSuccess: invalidateUsers,
      });

      const banUserMutation = useMutation({
        mutationKey: ["banUser", user.id],
        mutationFn: () => authClient.admin.banUser({ userId: user.id }),
        onSuccess: invalidateUsers,
      });

      const unbanUserMutation = useMutation({
        mutationKey: ["unbanUser", user.id],
        mutationFn: () => authClient.admin.unbanUser({ userId: user.id }),
        onSuccess: invalidateUsers,
      });

      const revokeSessionsMutation = useMutation({
        mutationKey: ["revokeSessions", user.id],
        mutationFn: () =>
          authClient.admin.revokeUserSessions({ userId: user.id }),
        onSuccess: invalidateUsers,
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-semibold">
              User Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onSelect={() => setRoleMutation.mutate("admin")}
                >
                  Set as Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setRoleMutation.mutate("user")}
                >
                  Set as User
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            {user.banned ? (
              <DropdownMenuItem onSelect={() => unbanUserMutation.mutate()}>
                Unban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={() => banUserMutation.mutate()}>
                Ban User
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={() => revokeSessionsMutation.mutate()}>
              Revoke All Sessions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => removeUserMutation.mutate()}
              className="text-red-600 focus:text-red-50 focus:bg-red-600"
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAuthorizeAction } from "@/actions/authorizing";
import { Client } from "@prisma/client";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  GithubIcon,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Permission {
  id: string;
  name: string;
  description: string;
}

const permissions: Permission[] = [
  {
    id: "read_profile",
    name: "个人用户数据",
    description: "电子邮件地址（只读）, 个人资料信息（只读）",
  },
];

export function AuthorizationCard({
  client,
  oauthParams,
}: {
  client: Client;
  oauthParams: string;
}) {
  const [expandedPermission, setExpandedPermission] = useState<string | null>(
    null,
  );
  const router = useRouter();

  const togglePermission = (id: string) => {
    setExpandedPermission(expandedPermission === id ? null : id);
  };

  const authorizingHandler = async () => {
    const url = await handleAuthorizeAction(
      oauthParams,
      client.userId,
      client.id,
      permissions[0].id,
    );
    router.push(url);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="mb-4 flex items-center justify-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-3xl font-bold text-red-500">B</span>
          </div>
          <GithubIcon className="h-16 w-16" />
        </div>
        <CardTitle className="text-2xl font-bold">授权 {client.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-center">
          {client.description}
          <br />
          想要访问您的 Shuzimumin-Community 账户
        </p>
        <div className="space-y-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="rounded-lg border p-4">
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => togglePermission(permission.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={permission.id}
                    checked={permission.id === "read_profile"}
                    disabled={permission.id === "read_profile"}
                  />
                  <label htmlFor={permission.id} className="font-medium">
                    {permission.name}
                  </label>
                </div>
                {expandedPermission === permission.id ? (
                  <ChevronsDownUp />
                ) : (
                  <ChevronsUpDown />
                )}
              </div>
              {expandedPermission === permission.id && (
                <p className="mt-2 text-sm text-gray-600">
                  {permission.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="mb-4 flex space-x-4">
          <Button variant="outline">取消</Button>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={authorizingHandler}
          >
            授权 {client.name}
          </Button>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          授权将重定向到 {client.redirectUri}
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>Q58论坛运营</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAuthorizeAction } from "@/actions/authorizing";
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

import { Client } from ".prisma/client";

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
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const router = useRouter();

  const togglePermission = (id: string) => {
    setExpandedPermission(expandedPermission === id ? null : id);
  };

  const authorizingHandler = async () => {
    try {
      setIsAuthorizing(true);
      const url = await handleAuthorizeAction(
        oauthParams,
        client.userId,
        client.id,
        permissions[0].id,
      );
      router.push(url);
    } catch (error) {
      setIsAuthorizing(false);
      // 这里可以添加错误提示
    }
  };

  return (
    <Card className="w-full max-w-2xl transform transition-all duration-300 hover:shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <div className="flex items-center justify-center space-x-6">
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-300 group-hover:opacity-75"></div>
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                {client.name[0].toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <CardTitle className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          授权 {client.name}
        </CardTitle>
        <p className="text-sm text-gray-500">
          该应用程序请求访问您的Q58论坛账号
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3 rounded-lg bg-gray-50 p-4">
          <h3 className="text-lg font-semibold">请求的权限</h3>
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="rounded-md border bg-white p-4 transition-all duration-200 hover:border-purple-200"
              onClick={() => togglePermission(permission.id)}
            >
              <div className="flex cursor-pointer items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={permission.id} checked disabled />
                  <label htmlFor={permission.id} className="font-medium">
                    {permission.name}
                  </label>
                </div>
                {expandedPermission === permission.id ? (
                  <ChevronsDownUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {expandedPermission === permission.id && (
                <div className="mt-2 pl-6 text-sm text-gray-500">
                  {permission.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="min-w-[100px] transition-all duration-200 hover:bg-gray-100"
            disabled={isAuthorizing}
          >
            取消
          </Button>
          <Button
            className="min-w-[100px] bg-gradient-to-r from-pink-600 to-purple-600 text-white transition-all duration-200 hover:from-pink-700 hover:to-purple-700"
            onClick={authorizingHandler}
            disabled={isAuthorizing}
          >
            {isAuthorizing ? (
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                授权中...
              </div>
            ) : (
              `授权 ${client.name}`
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-500">
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

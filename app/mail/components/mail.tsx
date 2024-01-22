"use client";
import * as React from "react";
import { Search } from "lucide-react";

import { AccountSwitcher } from "@/app/mail/components/account-switcher";
import { MailDisplay } from "@/app/mail/components/mail-display";
import { MailList } from "./mail-list";
import { Mail, links, links2 } from "@/app/mail/components/data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Nav } from "./nav";
import { CustomDrawer } from "./custom-drawer";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedMail, setSelectedMail] = React.useState(mails[0]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-screen items-stretch overflow-x-hidden"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onResize={(size) => {
            setIsCollapsed(size < 15);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              size < 15
            )}`;
          }}
          className={cn(
            "hidden md:block",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[56px] items-center justify-center",
              isCollapsed ? "h-[56px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={links} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={links2} />
        </ResizablePanel>
        <div className="hidden md:block">
          <ResizableHandle withHandle />
        </div>
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <div className="md:hidden flex items-center">
                <CustomDrawer />
              </div>
              <h1 className="text-xl font-bold mx-2">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList
                items={mails}
                selected={selectedMail}
                setSelected={setSelectedMail}
              />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList
                items={mails.filter((item) => !item.read)}
                selected={selectedMail}
                setSelected={setSelectedMail}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          className="overflow-clip"
        >
          <MailDisplay
            mail={mails.find((item) => item.id === selectedMail.id) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

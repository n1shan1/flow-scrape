"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type Props = {
  clickable?: boolean;
};

function BreadcrumbHeader({ clickable }: Props) {
  const pathName = usePathname();
  const activePath = pathName.split("/");

  return (
    <div className="flex items-center flex-start">
      <Breadcrumb>
        <BreadcrumbList>
          {activePath.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="capitalize"
                  href={!clickable ? `/${path}` : "/workflows"}
                >
                  {path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {activePath.length > 2 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbHeader;

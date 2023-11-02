import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "@/config/constant";

export default function LicenseCard({ changeLicense, currentLicense }) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(currentLicense);
  }, [currentLicense]);

  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-span-1 lg:col-start-3"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2
          id="timeline-title"
          className="text-lg font-medium text-gray-900 mb-4"
        >
          License Type
        </h2>

        <RadioGroup
          value={selected}
          onChange={(e) => {
            setSelected(e);
            changeLicense(e);
          }}
        >
          <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
          <div className="relative -space-y-px rounded-md bg-white">
            {plans.map((plan, planIdx) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan.value}
                className={({ checked }) =>
                  classNames(
                    planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                    planIdx === plans.length - 1
                      ? "rounded-bl-md rounded-br-md"
                      : "",
                    checked
                      ? "z-10 border-indigo-200 bg-indigo-50"
                      : "border-gray-200",
                    "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center text-sm">
                      <span
                        className={classNames(
                          checked
                            ? "bg-indigo-600 border-transparent"
                            : "bg-white border-gray-300",
                          active ? "ring-2 ring-offset-2 ring-indigo-600" : "",
                          "h-4 w-4 rounded-full border flex items-center justify-center"
                        )}
                        aria-hidden="true"
                      >
                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                      </span>
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? "text-indigo-900" : "text-gray-900",
                          "ml-3 font-medium"
                        )}
                      >
                        {plan.name}
                      </RadioGroup.Label>
                    </span>
                    <RadioGroup.Description
                      as="span"
                      className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                    >
                      <span
                        className={classNames(
                          checked ? "text-indigo-900" : "text-gray-900",
                          "font-medium"
                        )}
                      >
                        ${plan.priceMonthly} / mo
                      </span>{" "}
                      <span
                        className={
                          checked ? "text-indigo-700" : "text-gray-500"
                        }
                      >
                        (${plan.priceYearly} / yr)
                      </span>
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-700" : "text-gray-500",
                        "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                      )}
                    >
                      {plan.limit}
                    </RadioGroup.Description>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {/* <>
          <div className="mt-6 flex flex-col justify-stretch">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setOpenEmailChange(true)}
            >
              Change Email
            </button>
          </div>
          <div className="mt-6 flex flex-col justify-stretch">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setOpenPhoneChange(true)}
            >
              Change Phone
            </button>
          </div>
          <div className="mt-6 flex flex-col justify-stretch">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setOpenPasswordChange(true)}
            >
              Change Password
            </button>
          </div>
          <div className="mt-6 flex flex-col justify-stretch">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setOpenChangeServers(true)}
            >
              Assign to a new server
            </button>
          </div>
          <div className="mt-6 flex flex-col justify-stretch">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setOpenChangeLicense(true)}
            >
              Assign new license type
            </button>
          </div>
        </> */}
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Basic License",
    value: "L1",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Up to 5 active job postings",
  },
  {
    name: "Pro License",
    value: "L2",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Up to 25 active job postings",
  },
  {
    name: "Custom License",
    value: "L3",
    priceMonthly: 249,
    priceYearly: 2490,
    limit: "Unlimited active job postings",
  },
  {
    name: "SAAS License",
    value: "LSAAS",
    priceMonthly: 200,
    priceYearly: 1990,
    limit: "Unlimited active job postings",
  },
  {
    name: "WORKER License",
    value: "WORKER",
    priceMonthly: 200,
    priceYearly: 1990,
    limit: "Unlimited active job postings",
  },
];

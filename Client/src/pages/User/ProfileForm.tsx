import React, { useEffect, useState } from 'react'
import FormSkeleton from '../../components/Skeletons/FormSkeleton';
const user={
            firstName: "Md",
            lastName: "Rimel",
            email: "rimell1111@gmail.com",
            address: "Kingston, 5236, United State",
          }
export default function ProfileForm() {
  const [loading, setlodaing] = useState(true);
      useEffect(() => {
        setTimeout(() => setlodaing(false), 500);
      }, []);
    
      return loading ? (
        <FormSkeleton />
      ) : (
    <form>
      <h1 className="text-[20px] font-medium text-secondary-two mb-[18px]">
        Edit Your Profile
      </h1>

      <div className="flex gap-[50px]">
        <div className="w-[330px]">
          <label className="block text-[16px] mb-[8px]">First Name</label>

          <input
            type="text"
            value={user.firstName}
            readOnly
            className="
                w-[330px]
                h-[42px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
              "
          />
        </div>

        <div className="w-[330px]">
          <label className="block text-[16px] mb-[8px]">Last Name</label>

          <input
            type="text"
            value={user.lastName}
            readOnly
            className="
                w-[330px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
              "
          />
        </div>
      </div>

      <div className="flex gap-[50px] mt-[22px]">
        <div className="w-[330px]">
          <label className="block text-[16px] mb-[8px]">Email</label>

          <input
            type="email"
            value={user.email}
            readOnly
            className="
                w-[330px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
              "
          />
        </div>

        <div className="w-[330px]">
          <label className="block text-[16px] mb-[8px]">Address</label>

          <input
            type="text"
            value={user.address}
            readOnly
            className="
                w-[330px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
              "
          />
        </div>
      </div>

      <div className="mt-[22px] w-[710px]">
        <label className="block text-[16px] mb-[8px]">Password Changes</label>

        <div className="flex flex-col gap-[13px]">
          <input
            type="password"
            placeholder="Current Password"
            className="
                w-[710px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
                placeholder:text-gray-500
              "
          />

          <input
            type="password"
            placeholder="New Password"
            className="
                w-[710px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
                placeholder:text-gray-500
              "
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="
                w-[710px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[16px]
                outline-none
                placeholder:text-gray-500
              "
          />
        </div>
      </div>

      <div className="w-[710px] flex justify-end items-center gap-[32px] mt-[20px]">
        <button type="button" className="text-[16px] cursor-pointer">
          Cancel
        </button>

        <button
          type="submit"
          className="
              w-[178px]
              h-[48px]
              bg-secondary-two
              text-white
              rounded
              text-[16px]
              cursor-pointer
            "
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

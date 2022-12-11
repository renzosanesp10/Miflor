import React, { useState } from 'react'
import { Modal, Box, Typography } from '@mui/material'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const FloatingWindow: React.FC<Props> = ({
  open,
  setOpen,
  children
}) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}
